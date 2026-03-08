import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl, TextControl } from '@wordpress/components';

const FONT_WEIGHTS = [
	{ label: __( 'Default', 'wpframeblocks' ), value: '' },
	{ label: __( 'Normal — 400', 'wpframeblocks' ), value: '400' },
	{ label: __( 'Medium — 500', 'wpframeblocks' ), value: '500' },
	{ label: __( 'Semibold — 600', 'wpframeblocks' ), value: '600' },
	{ label: __( 'Bold — 700', 'wpframeblocks' ), value: '700' },
];

/**
 * Typography inspector panel.
 *
 * Required block attributes (define in block.json as needed):
 *   fontSize       string   CSS value, e.g. "14px", "1rem"
 *   fontWeight     string   e.g. "400", "700"
 *   lineHeight     number   unitless ratio, e.g. 1.5
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {Object|true} props.enabled  true = all on; object = per-control flags
 */
export default function TypographyPanel( { attributes, setAttributes, enabled } ) {
	const { fontSize, fontWeight, lineHeight } = attributes;

	const show =
		enabled === true
			? { fontSize: true, fontWeight: true, lineHeight: true }
			: enabled;

	return (
		<PanelBody
			title={ __( 'Typography', 'wpframeblocks' ) }
			initialOpen={ false }
		>
			{ show.fontSize && (
				<TextControl
					label={ __( 'Font Size', 'wpframeblocks' ) }
					value={ fontSize || '' }
					placeholder="e.g. 14px, 1rem"
					help={ __( 'Any valid CSS font-size value.', 'wpframeblocks' ) }
					onChange={ ( value ) =>
						setAttributes( { fontSize: value } )
					}
				/>
			) }
			{ show.fontWeight && (
				<SelectControl
					label={ __( 'Font Weight', 'wpframeblocks' ) }
					value={ fontWeight || '' }
					options={ FONT_WEIGHTS }
					onChange={ ( value ) =>
						setAttributes( { fontWeight: value } )
					}
				/>
			) }
			{ show.lineHeight && (
				<RangeControl
					label={ __( 'Line Height', 'wpframeblocks' ) }
					value={ lineHeight || 1.5 }
					min={ 1 }
					max={ 3 }
					step={ 0.05 }
					onChange={ ( value ) =>
						setAttributes( { lineHeight: value } )
					}
				/>
			) }
		</PanelBody>
	);
}
