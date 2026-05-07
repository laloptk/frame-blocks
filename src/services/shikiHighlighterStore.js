import { createHighlighterCore, createOnigurumaEngine } from 'shiki/core';

// Static language imports — only these files will be bundled by webpack.
// To add a language: import it here, add it to LANGS, and add it to
// LANGUAGES or TERMINAL_LANGUAGES in code-syntax-highlighter/edit.js.
import langPHP from '@shikijs/langs/php';
import langJavaScript from '@shikijs/langs/javascript';
import langTypeScript from '@shikijs/langs/typescript';
import langCSS from '@shikijs/langs/css';
import langHTML from '@shikijs/langs/html';
import langJSON from '@shikijs/langs/json';
import langBash from '@shikijs/langs/bash';
import langPython from '@shikijs/langs/python';
import langRust from '@shikijs/langs/rust';
import langGo from '@shikijs/langs/go';
import langSQL from '@shikijs/langs/sql';
import langYAML from '@shikijs/langs/yaml';
import langMarkdown from '@shikijs/langs/markdown';
import langShellSession from '@shikijs/langs/shellsession';
import langPowerShell from '@shikijs/langs/powershell';
import langFish from '@shikijs/langs/fish';
import langGitCommit from '@shikijs/langs/git-commit';
import langGitRebase from '@shikijs/langs/git-rebase';

// Static theme imports — only these files will be bundled by webpack.
// To add a theme: import it here, add it to THEMES, and add it to
// the THEMES array in code-syntax-highlighter/edit.js.
import themeGithubDark from '@shikijs/themes/github-dark';
import themeGithubLight from '@shikijs/themes/github-light';
import themeDracula from '@shikijs/themes/dracula';
import themeOneDarkPro from '@shikijs/themes/one-dark-pro';
import themeNord from '@shikijs/themes/nord';
import themeCatppuccinMocha from '@shikijs/themes/catppuccin-mocha';
import themeSolarizedDark from '@shikijs/themes/solarized-dark';
import themeSolarizedLight from '@shikijs/themes/solarized-light';
import themeDarkPlus from '@shikijs/themes/dark-plus';
import themeMinLight from '@shikijs/themes/min-light';
import themeNightOwl from '@shikijs/themes/night-owl';
import themeRed from '@shikijs/themes/red';

const DEFAULT_LANGUAGE = 'php';
const DEFAULT_THEME = 'github-dark';

const LANGS = [
	langPHP, langJavaScript, langTypeScript, langCSS, langHTML, langJSON,
	langBash, langPython, langRust, langGo, langSQL, langYAML, langMarkdown,
	langShellSession, langPowerShell, langFish, langGitCommit, langGitRebase,
];

const THEMES = [
	themeGithubDark, themeGithubLight, themeDracula, themeOneDarkPro, themeNord,
	themeCatppuccinMocha, themeSolarizedDark, themeSolarizedLight, themeDarkPlus,
	themeMinLight, themeNightOwl, themeRed,
];

let highlighterPromise = null;

function getHighlighter() {
	if ( ! highlighterPromise ) {
		highlighterPromise = createHighlighterCore( {
			langs: LANGS,
			themes: THEMES,
			engine: createOnigurumaEngine( () => import( 'shiki/wasm' ) ),
		} ).catch( ( err ) => {
			highlighterPromise = null;
			throw err;
		} );
	}
	return highlighterPromise;
}

/**
 * Tokenizes code using the cached singleton highlighter.
 *
 * All supported languages and themes are pre-loaded at initialization,
 * so no per-request loading is needed.
 *
 * @param {string} code
 * @param {string} language
 * @param {string} theme
 * @returns {Promise<import('shiki').CodeToTokensResult>}
 */
export async function tokenizeWithCachedHighlighter( code, language, theme ) {
	const lang = language || DEFAULT_LANGUAGE;
	const thm = theme || DEFAULT_THEME;
	const highlighter = await getHighlighter();
	return highlighter.codeToTokens( code, { lang, theme: thm } );
}
