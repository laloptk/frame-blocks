import { InspectorControls } from '@wordpress/block-editor';

import TypographyPanel from './TypographyPanel';
import ColorPanel from './ColorPanel';
import SpacingPanel from './SpacingPanel';
import BorderPanel from './BorderPanel';

/**
 * Normalizes an enable value to either false or a config object.
 * true            → all sub-controls on (uses defaults)
 * false/undefined → panel hidden
 * object          → merged with defaults (missing keys default to false)
 */
function normalize( val, defaults ) {
	if ( ! val ) return false;
	if ( val === true ) return defaults;
	return { ...defaults, ...val };
}

/**
 * Composable styling controls for InspectorControls.
 * Drop this into a block's edit.js to get typography, color, spacing,
 * and border panels — only the ones you enable will render.
 *
 * Usage:
 *   <StyleControls
 *     attributes={ attributes }
 *     setAttributes={ setAttributes }
 *     enable={ {
 *       typography: true,                          // all typography controls
 *       colors: { text: true, background: false }, // only text color
 *       spacing: false,                            // panel hidden
 *       border: { radius: true },                  // only border-radius
 *     } }
 *   />
 *
 * Required attributes per panel (add to block.json as needed):
 *   typography → fontSize (string), fontWeight (string), lineHeight (number)
 *   colors     → textColor (string), backgroundColor (string)
 *   spacing    → padding (object), margin (object)
 *   border     → borderRadius (number), borderWidth (number), borderColor (string)
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {Object}   props.enable
 */
export default function StyleControls( {
	attributes,
	setAttributes,
	enable = {},
} ) {
	const typography = normalize( enable.typography, {
		fontSize: true,
		fontWeight: true,
		lineHeight: true,
	} );
	const colors = normalize( enable.colors, {
		text: true,
		background: true,
	} );
	const spacing = normalize( enable.spacing, {
		padding: true,
		margin: true,
	} );
	const border = normalize( enable.border, {
		radius: true,
		width: true,
		color: true,
	} );

	if ( ! attributes ) {
		return null;
	}

	if ( ! typography && ! colors && ! spacing && ! border ) {
		return null;
	}

	return (
		<InspectorControls>
			{ typography && (
				<TypographyPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					enabled={ typography }
				/>
			) }
			{ colors && (
				<ColorPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					enabled={ colors }
				/>
			) }
			{ spacing && (
				<SpacingPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					enabled={ spacing }
				/>
			) }
			{ border && (
				<BorderPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					enabled={ border }
				/>
			) }
		</InspectorControls>
	);
}

export { TypographyPanel, ColorPanel, SpacingPanel, BorderPanel };
