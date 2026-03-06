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
