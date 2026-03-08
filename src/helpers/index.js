// Shared utility helpers

/**
 * Parse a plain-text social-media caption and split it into segments tagged as
 * 'plain', 'hashtag' (#word), or 'mention' (@word).
 *
 * Rules:
 *   - Supports Latin, accented, and Cyrillic characters in tokens.
 *   - Hashtags made entirely of digits (#123) are treated as plain text.
 *
 * @param {string} text  Plain-text caption string.
 * @returns {Array<{text: string, type: 'plain'|'hashtag'|'mention'}>}
 */
export function parseCaptionSegments( text ) {
	if ( ! text ) return [];

	const segments = [];
	const TOKEN = /(#[\w\u00C0-\u024F\u0400-\u04FF]+|@[\w.]+)/gu;
	let lastIndex = 0;
	let match;

	while ( ( match = TOKEN.exec( text ) ) !== null ) {
		if ( match.index > lastIndex ) {
			segments.push( {
				text: text.slice( lastIndex, match.index ),
				type: 'plain',
			} );
		}

		const token = match[ 0 ];
		const isHashtag = token[ 0 ] === '#';

		// Skip numeric-only hashtags — all platforms ignore these.
		if ( isHashtag && /^#\d+$/.test( token ) ) {
			segments.push( { text: token, type: 'plain' } );
		} else {
			segments.push( {
				text: token,
				type: isHashtag ? 'hashtag' : 'mention',
			} );
		}

		lastIndex = TOKEN.lastIndex;
	}

	if ( lastIndex < text.length ) {
		segments.push( { text: text.slice( lastIndex ), type: 'plain' } );
	}

	return segments;
}

/**
 * Builds a React inline style object from the standard StyleControls attributes.
 * Only includes properties that have a meaningful non-default value, so the
 * output is clean and doesn't override CSS-token defaults unnecessarily.
 *
 * @param {Object} attributes  Block attributes (superset of style attributes is fine)
 * @return {Object} React style object
 */
export function buildInlineStyle( {
	fontSize,
	fontWeight,
	lineHeight,
	backgroundColor,
	padding,
	margin,
	borderRadius,
	borderWidth,
	borderColor,
} = {} ) {
	const style = {};

	if ( fontSize ) style.fontSize = fontSize;
	if ( fontWeight ) style.fontWeight = fontWeight;
	if ( lineHeight ) style.lineHeight = lineHeight;
	if ( backgroundColor ) style.backgroundColor = backgroundColor;
	if ( borderRadius > 0 ) style.borderRadius = `${ borderRadius }px`;
	if ( borderWidth > 0 ) {
		style.borderWidth = `${ borderWidth }px`;
		style.borderStyle = 'solid';
	}
	if ( borderColor ) style.borderColor = borderColor;
	if ( padding ) style.padding = padding;
	if ( margin ) style.margin = margin;

	return style;
}

/**
 * Returns a Font Awesome icon class and a BEM color-modifier class for a given filename.
 *
 * @param {string} fileName
 * @return {{ iconClass: string, colorClass: string }}
 */
export function getFileIcon( fileName ) {
	const ext = fileName ? fileName.split( '.' ).pop().toLowerCase() : '';
	switch ( ext ) {
		case 'ts':
		case 'tsx':
			return {
				iconClass: 'fa-brands fa-js',
				colorClass: 'wp-block-frames-vscode__tab-icon--ts',
			};
		case 'js':
		case 'jsx':
			return {
				iconClass: 'fa-brands fa-js',
				colorClass: 'wp-block-frames-vscode__tab-icon--js',
			};
		case 'php':
			return { iconClass: 'fa-brands fa-php', colorClass: '' };
		case 'css':
		case 'scss':
			return { iconClass: 'fa-brands fa-css3-alt', colorClass: '' };
		case 'html':
			return { iconClass: 'fa-brands fa-html5', colorClass: '' };
		default:
			return {
				iconClass: 'fa-regular fa-file-code',
				colorClass: 'wp-block-frames-vscode__tab-icon--dim',
			};
	}
}

/**
 * Returns Font Awesome and BEM modifier classes for a file-tree-item.
 * Used by wpframeblocks/file-tree-item edit.js and save.js.
 *
 * @param {string}  itemType  'file' | 'folder'
 * @param {string}  fileExt   Extension string, e.g. 'ts', '.tsx', ''
 * @param {boolean} isOpen    Whether a folder is expanded
 * @return {{ iconFA: string, iconMod: string }}
 */
export function getTreeItemIcon( itemType, fileExt, isOpen ) {
	if ( itemType === 'folder' ) {
		return isOpen
			? {
					iconFA: 'fa-solid fa-folder-open',
					iconMod: 'wp-block-frames-file-tree__icon--folder-open',
			  }
			: {
					iconFA: 'fa-solid fa-folder',
					iconMod: 'wp-block-frames-file-tree__icon--folder',
			  };
	}

	const ext = ( fileExt || '' ).toLowerCase().replace( /^\./, '' );
	switch ( ext ) {
		case 'ts':
			return { iconFA: 'fa-brands fa-js', iconMod: 'wp-block-frames-file-tree__icon--ts' };
		case 'tsx':
			return { iconFA: 'fa-brands fa-react', iconMod: 'wp-block-frames-file-tree__icon--tsx' };
		case 'js':
		case 'jsx':
			return { iconFA: 'fa-brands fa-js', iconMod: 'wp-block-frames-file-tree__icon--js' };
		case 'php':
			return { iconFA: 'fa-brands fa-php', iconMod: '' };
		case 'css':
		case 'scss':
			return { iconFA: 'fa-brands fa-css3-alt', iconMod: '' };
		case 'html':
			return { iconFA: 'fa-brands fa-html5', iconMod: '' };
		default:
			return { iconFA: 'fa-regular fa-file-code', iconMod: '' };
	}
}

/**
 * Parses a slash-separated filePath + fileName into an ordered array of breadcrumb segments.
 *
 * @param {string} filePath  e.g. "src/components"
 * @param {string} fileName  e.g. "index.ts"
 * @return {Array<{ label: string, active: boolean }>}
 */
export function parseBreadcrumb( filePath, fileName ) {
	const segments = filePath ? filePath.split( '/' ).filter( Boolean ) : [];
	const crumbs = segments.map( ( label ) => ( { label, active: false } ) );
	crumbs.push( { label: fileName || '', active: true } );
	return crumbs;
}
