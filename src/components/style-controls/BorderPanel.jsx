import { __ } from '@wordpress/i18n';
import { RangeControl, BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';

/**
 * Border inspector panel.
 *
 * @param {Object}      props
 * @param {Object}      props.group         Responsive border group: { desktop, tablet, mobile }
 * @param {Function}    props.setAttributes
 * @param {Object|true} props.enabled       true = all on; object = { radius, width, color }
 * @param {string}      props.view          'desktop' | 'tablet' | 'mobile'
 */
export default function BorderPanel({ group, setAttributes, enabled, view }) {
	const { borderRadius, borderWidth, borderColor } = group[view];

	const show =
		enabled === true
			? { radius: true, width: true, color: true }
			: enabled;

	return (
		<>
			{show.radius && (
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Border Radius', 'frame-blocks')}
					value={borderRadius ?? 0}
					min={0}
					max={50}
					onChange={(value) =>
						setAttributes({
							border: {
								...group,
								[view]: {
									...group[view],
									borderRadius: value,
								},
							},
						})
					}
				/>
			)}
			{show.width && (
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Border Width', 'frame-blocks')}
					value={borderWidth ?? 0}
					min={0}
					max={10}
					onChange={(value) =>
						setAttributes({
							border: {
								...group,
								[view]: {
									...group[view],
									borderWidth: value,
								},
							},
						})
					}
				/>
			)}
			{show.color && (
				<BaseControl
					__nextHasNoMarginBottom
					label={__('Border Color', 'frame-blocks')}
					id="wpfb-border-color"
				>
					<ColorPalette
						value={borderColor || ''}
						onChange={(value) =>
							setAttributes({
								border: {
									...group,
									[view]: {
										...group[view],
										borderColor: value,
									},
								},
							})
						}
					/>
				</BaseControl>
			)}
		</>
	);
}
