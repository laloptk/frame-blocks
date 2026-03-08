import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';

/**
 * Color inspector panel.
 *
 * Required block attributes (define in block.json as needed):
 *   textColor        string   CSS color value
 *   backgroundColor  string   CSS color value
 *
 * @param {Object}  props
 * @param {Object}  props.attributes
 * @param {Function} props.setAttributes
 * @param {Object|true} props.enabled  true = all on; object = { text, background }
 */
export default function ColorPanel( { attributes, setAttributes, enabled } ) {
	const { textColor, backgroundColor } = attributes;

	const show =
		enabled === true ? { text: true, background: true } : enabled;

	return (
		<PanelBody
			title={ __( 'Color', 'wpframeblocks' ) }
			initialOpen={ false }
		>
			{ show.text && (
				<BaseControl
					label={ __( 'Text Color', 'wpframeblocks' ) }
					id="wpfb-text-color"
				>
					<ColorPalette
						value={ textColor || '' }
						onChange={ ( value ) =>
							setAttributes( { textColor: value } )
						}
					/>
				</BaseControl>
			) }
			{ show.background && (
				<BaseControl
					label={ __( 'Background Color', 'wpframeblocks' ) }
					id="wpfb-bg-color"
				>
					<ColorPalette
						value={ backgroundColor || '' }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value } )
						}
					/>
				</BaseControl>
			) }
		</PanelBody>
	);
}
