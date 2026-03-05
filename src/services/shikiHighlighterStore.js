/**
 * Shiki Highlighter Store
 *
 * Redux-like module-level store for caching the Shiki singleton highlighter
 * and deduplicating concurrent language/theme loads across multiple block
 * instances on the same page.
 */
import { getSingletonHighlighter, codeToTokens } from 'shiki';

const DEFAULT_LANGUAGE = 'php';
const DEFAULT_THEME = 'github-dark';

/**
 * Module-level state — shared across every block instance.
 * @type {{
 *   highlighterPromise: Promise|null,
 *   loadedLanguages: Set<string>,
 *   loadedThemes: Set<string>,
 *   pendingLoads: Map<string, Promise>
 * }}
 */
const state = {
	highlighterPromise: null,
	loadedLanguages: new Set(),
	loadedThemes: new Set(),
	pendingLoads: new Map(), // key: "language::theme"
};

/**
 * Returns (or creates) the singleton highlighter promise.
 * Clears the cached promise on failure so callers can retry.
 */
function getOrInitHighlighter() {
	if ( ! state.highlighterPromise ) {
		state.highlighterPromise = getSingletonHighlighter( {
			langs: [ DEFAULT_LANGUAGE ],
			themes: [ DEFAULT_THEME ],
		} )
			.then( ( hl ) => {
				state.loadedLanguages.add( DEFAULT_LANGUAGE );
				state.loadedThemes.add( DEFAULT_THEME );
				return hl;
			} )
			.catch( ( err ) => {
				// Clear so the next call can retry.
				state.highlighterPromise = null;
				throw err;
			} );
	}
	return state.highlighterPromise;
}

/**
 * Ensures the requested language and theme are loaded on the highlighter.
 * Deduplicates concurrent loads with the pendingLoads map.
 *
 * @param {object} highlighter - Shiki highlighter instance.
 * @param {string} language
 * @param {string} theme
 */
async function ensureLoaded( highlighter, language, theme ) {
	const langLoaded = state.loadedLanguages.has( language );
	const themeLoaded = state.loadedThemes.has( theme );

	if ( langLoaded && themeLoaded ) {
		return;
	}

	const key = `${ language }::${ theme }`;

	if ( state.pendingLoads.has( key ) ) {
		return state.pendingLoads.get( key );
	}

	const promise = Promise.all( [
		langLoaded
			? Promise.resolve()
			: highlighter
					.loadLanguage( language )
					.then( () => state.loadedLanguages.add( language ) ),
		themeLoaded
			? Promise.resolve()
			: highlighter
					.loadTheme( theme )
					.then( () => state.loadedThemes.add( theme ) ),
	] ).finally( () => {
		state.pendingLoads.delete( key );
	} );

	state.pendingLoads.set( key, promise );
	return promise;
}

/**
 * Tokenizes code using the cached singleton highlighter.
 *
 * Falls back to the standalone shiki `codeToTokens` if the singleton path
 * fails. Invalid language/theme values are resolved to defaults.
 *
 * @param {string} code
 * @param {string} language
 * @param {string} theme
 * @returns {Promise<import('shiki').CodeToTokensResult>}
 */
export async function tokenizeWithCachedHighlighter( code, language, theme ) {
	const lang = language || DEFAULT_LANGUAGE;
	const thm = theme || DEFAULT_THEME;

	try {
		const highlighter = await getOrInitHighlighter();
		await ensureLoaded( highlighter, lang, thm );
		return highlighter.codeToTokens( code, { lang, theme: thm } );
	} catch ( primaryErr ) {
		// Fallback: standalone codeToTokens (creates its own internal highlighter).
		try {
			return await codeToTokens( code, { lang, theme: thm } );
		} catch ( fallbackErr ) {
			throw fallbackErr;
		}
	}
}
