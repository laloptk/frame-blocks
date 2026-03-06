// Shared utility helpers

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
