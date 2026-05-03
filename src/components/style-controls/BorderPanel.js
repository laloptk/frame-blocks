import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';

/**
 * Border inspector panel.
 *
 * Required block attributes (define in block.json as needed):
 *   borderRadius  number   px value, e.g. 8
 *   borderWidth   number   px value, e.g. 1
 *   borderColor   string   CSS color value
 *
 * @param {Object}  props
 * @param {Object}  props.attributes
 * @param {Function} props.setAttributes
 * @param {Object|true} props.enabled  true = all on; object = { radius, width, color }
 */
export default function BorderPanel({ attributes, setAttributes, enabled, view }) {
	const { borderRadius, borderWidth, borderColor } = attributes[view];

	const show =
		enabled === true
			? { radius: true, width: true, color: true }
			: enabled;

	return (
		<>
			{show.radius && (
				<RangeControl
					label={__('Border Radius', 'wpframeblocks')}
					value={borderRadius ?? 0}
					min={0}
					max={50}
					onChange={(value) =>
						setAttributes(
							{
								border:
								{
									...attributes,
									[view]:
									{
										...attributes[view],
										borderRadius: value
									}
								}
							}
						)
					}
				/>
			)}
			{show.width && (
				<RangeControl
					label={__('Border Width', 'wpframeblocks')}
					value={borderWidth ?? 0}
					min={0}
					max={10}
					onChange={(value) =>
						setAttributes(
							{
								border:
								{
									...attributes,
									[view]:
									{
										...attributes[view],
										borderWidth: value
									}
								}
							}
						)
					}
				/>
			)}
			{show.color && (
				<BaseControl
					label={__('Border Color', 'wpframeblocks')}
					id="wpfb-border-color"
				>
					<ColorPalette
						value={borderColor || ''}
						onChange={(value) =>
							setAttributes(
								{
									border:
									{
										...attributes,
										[view]:
										{
											...attributes[view],
											borderColor: value
										}
									}
								}
							)
						}
					/>
				</BaseControl>
			)}
		</>
	);
}
