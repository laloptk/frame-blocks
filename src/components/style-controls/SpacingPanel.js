import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Spacing inspector panel.
 *
 * Required block attributes (define in block.json as needed):
 *   padding  string  CSS shorthand, e.g. "8px 16px"
 *   margin   string  CSS shorthand, e.g. "16px 0"
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {Object|true} props.enabled  true = all on; object = { padding, margin }
 */
export default function SpacingPanel( { attributes, setAttributes, enabled } ) {
	const { padding, margin } = attributes;

	const show =
		enabled === true ? { padding: true, margin: true } : enabled;

	return (
		<PanelBody
			title={ __( 'Spacing', 'wpframeblocks' ) }
			initialOpen={ false }
		>
			{ show.padding && (
				<TextControl
					label={ __( 'Padding', 'wpframeblocks' ) }
					value={ padding || '' }
					placeholder="e.g. 8px 16px"
					help={ __( 'CSS shorthand: top right bottom left.', 'wpframeblocks' ) }
					onChange={ ( value ) =>
						setAttributes( { padding: value } )
					}
				/>
			) }
			{ show.margin && (
				<TextControl
					label={ __( 'Margin', 'wpframeblocks' ) }
					value={ margin || '' }
					placeholder="e.g. 16px 0"
					help={ __( 'CSS shorthand: top/bottom only.', 'wpframeblocks' ) }
					onChange={ ( value ) =>
						setAttributes( { margin: value } )
					}
				/>
			) }
		</PanelBody>
	);
}
