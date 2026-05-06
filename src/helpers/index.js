// Shared utility helpers
import { useSelect } from '@wordpress/data';

/**
 * Parse a plain-text social-media string into semantic segments:
 * plain text, hashtags, mentions, URLs, and line breaks.
 *
 * @param {string} text  Plain-text caption/comment string.
 * @returns {Array<{text: string, type: 'plain'|'hashtag'|'mention'|'url'|'linebreak'}>}
 */
export function parseCaptionSegments(text) {
	if (!text) return [];

	const segments = [];
	const normalizedText = text.replace(/\r\n/g, '\n');
	const TOKEN =
		/(https?:\/\/[^\s]+|www\.[^\s]+|#[\wÀ-ɏЀ-ӿ]+|@[\w.]+|\n)/gu;
	let lastIndex = 0;
	let match;

	while ((match = TOKEN.exec(normalizedText)) !== null) {
		if (match.index > lastIndex) {
			segments.push({
				text: normalizedText.slice(lastIndex, match.index),
				type: 'plain',
			});
		}

		const token = match[0];
		const firstChar = token[0];
		const isHashtag = firstChar === '#';
		const isMention = firstChar === '@';
		const isLineBreak = token === '\n';
		const isUrl =
			token.startsWith('http://') ||
			token.startsWith('https://') ||
			token.startsWith('www.');

		if (isLineBreak) {
			segments.push({ text: token, type: 'linebreak' });
			lastIndex = TOKEN.lastIndex;
			continue;
		}

		if (isUrl) {
			const cleanedUrl = token.replace(/[),.!?;:]+$/u, '');
			const trailingText = token.slice(cleanedUrl.length);
			segments.push({ text: cleanedUrl, type: 'url' });
			if (trailingText) {
				segments.push({ text: trailingText, type: 'plain' });
			}
			lastIndex = TOKEN.lastIndex;
			continue;
		}

		// Skip numeric-only hashtags - all platforms ignore these.
		if (isHashtag && /^#\d+$/.test(token)) {
			segments.push({ text: token, type: 'plain' });
		} else if (isMention) {
			segments.push({ text: token, type: 'mention' });
		} else {
			segments.push({ text: token, type: 'hashtag' });
		}

		lastIndex = TOKEN.lastIndex;
	}

	if (lastIndex < normalizedText.length) {
		segments.push({
			text: normalizedText.slice(lastIndex),
			type: 'plain',
		});
	}

	return segments;
}

/**
 * Resolves a single responsive value with fallback chain:
 *   desktop → desktop value only
 *   tablet  → tablet → desktop
 *   mobile  → mobile → tablet → desktop
 *
 * Treats '', null, and undefined as "no value" and falls back.
 * Treats 0 as a valid value — it does NOT trigger fallback.
 *
 * @param {Object} groupAttr  Responsive group object (e.g. attributes.spacing).
 * @param {string} key        Property key to resolve (e.g. 'padding').
 * @param {string} deviceType 'Desktop' | 'Tablet' | 'Mobile'
 * @returns {*} Resolved value, or undefined if nothing found in the chain.
 */
export function resolveResponsiveValue(groupAttr, key, deviceType) {
	if (!groupAttr) return undefined;
	const device = (deviceType || 'Desktop').toLowerCase();
	const hasValue = (v) => v !== '' && v !== null && v !== undefined;
	const desktop = groupAttr.desktop?.[key];
	const tablet = groupAttr.tablet?.[key];
	const mobile = groupAttr.mobile?.[key];
	if (device === 'mobile') {
		if (hasValue(mobile)) return mobile;
		if (hasValue(tablet)) return tablet;
		if (hasValue(desktop)) return desktop;
	} else if (device === 'tablet') {
		if (hasValue(tablet)) return tablet;
		if (hasValue(desktop)) return desktop;
	} else {
		if (hasValue(desktop)) return desktop;
	}
	return undefined;
}

/**
 * Builds a React inline style object from responsive block attributes and the
 * current device type. Applies the fallback chain via resolveResponsiveValue.
 *
 * Property mapping:
 *   spacing.padding      → padding
 *   spacing.margin       → margin
 *   border.borderRadius  → borderRadius as "${n}px" (only if > 0)
 *   border.borderWidth   → borderWidth as "${n}px" + borderStyle: 'solid' (only if > 0)
 *   border.borderColor   → borderColor
 *   typography.fontSize  → fontSize
 *   typography.fontWeight → fontWeight
 *   typography.lineHeight → lineHeight
 *
 * Missing groups are silently skipped — blocks without a typography attribute
 * will not throw.
 *
 * @param {Object} attributes  Full block attributes object.
 * @param {string} deviceType  'Desktop' | 'Tablet' | 'Mobile'
 * @returns {Object} React style object.
 */
export function buildResponsiveStyles(attributes, deviceType) {
	const style = {};
	const resolve = (group, key) =>
		resolveResponsiveValue(attributes[group], key, deviceType);

	const padding = resolve('spacing', 'padding');
	const margin = resolve('spacing', 'margin');
	const borderRadius = resolve('border', 'borderRadius');
	const borderWidth = resolve('border', 'borderWidth');
	const borderColor = resolve('border', 'borderColor');
	const fontSize = resolve('typography', 'fontSize');
	const fontWeight = resolve('typography', 'fontWeight');
	const lineHeight = resolve('typography', 'lineHeight');

	if (padding) style.padding = padding;
	if (margin) style.margin = margin;
	if (borderRadius > 0) style.borderRadius = `${borderRadius}px`;
	if (borderWidth > 0) {
		style.borderWidth = `${borderWidth}px`;
		style.borderStyle = 'solid';
	}
	if (borderColor) style.borderColor = borderColor;
	if (fontSize) style.fontSize = fontSize;
	if (fontWeight) style.fontWeight = fontWeight;
	if (lineHeight) style.lineHeight = lineHeight;

	return style;
}

/**
 * Hook: returns the current global device preview type from the editor store.
 * Checks core/edit-post, then core/editor, then core/edit-site for compatibility
 * across post editor, site editor, and future contexts.
 *
 * @returns {'Desktop'|'Tablet'|'Mobile'}
 */
export function useDeviceType() {
	return (
		useSelect((select) => {
			const editPost = select('core/edit-post');
			if (editPost?.getDeviceType) return editPost.getDeviceType();
			const editor = select('core/editor');
			if (editor?.getDeviceType) return editor.getDeviceType();
			const editSite = select('core/edit-site');
			if (editSite?.getDeviceType) return editSite.getDeviceType();
			return 'Desktop';
		}, []) ?? 'Desktop'
	);
}

/**
 * Returns a Font Awesome icon class and a BEM color-modifier class for a given filename.
 *
 * @param {string} fileName
 * @return {{ iconClass: string, colorClass: string }}
 */
export function getFileIcon(fileName) {
	const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
	switch (ext) {
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
 * Used by frameblocks/file-tree-item edit.js and save.js.
 *
 * @param {string}  itemType  'file' | 'folder'
 * @param {string}  fileExt   Extension string, e.g. 'ts', '.tsx', ''
 * @param {boolean} isOpen    Whether a folder is expanded
 * @return {{ iconFA: string, iconMod: string }}
 */
export function getTreeItemIcon(itemType, fileExt, isOpen) {
	if (itemType === 'folder') {
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

	const ext = (fileExt || '').toLowerCase().replace(/^\./, '');
	switch (ext) {
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
 * Builds BEM modifier class strings from the visibility attribute.
 * Only generates hide-classes for explicitly `false` values (null = inherit from parent).
 *
 * @param {Object} visibility  Responsive visibility attribute { desktop, tablet, mobile }.
 * @returns {string} Space-separated class string, or empty string if nothing to hide.
 */
export function buildVisibilityClasses(visibility) {
	if (!visibility) return '';
	const { desktop = {}, tablet = {}, mobile = {} } = visibility;
	return [
		desktop.showSidebar === false && 'has-no-sidebar',
		desktop.showTerminal === false && 'has-no-terminal',
		tablet.showSidebar === false && 'has-tablet-no-sidebar',
		tablet.showTerminal === false && 'has-tablet-no-terminal',
		mobile.showSidebar === false && 'has-mobile-no-sidebar',
		mobile.showTerminal === false && 'has-mobile-no-terminal',
	].filter(Boolean).join(' ');
}

/**
 * Parses a slash-separated filePath + fileName into an ordered array of breadcrumb segments.
 *
 * @param {string} filePath  e.g. "src/components"
 * @param {string} fileName  e.g. "index.ts"
 * @return {Array<{ label: string, active: boolean }>}
 */
export function parseBreadcrumb(filePath, fileName) {
	const segments = filePath ? filePath.split('/').filter(Boolean) : [];
	const crumbs = segments.map((label) => ({ label, active: false }));
	crumbs.push({ label: fileName || '', active: true });
	return crumbs;
}
