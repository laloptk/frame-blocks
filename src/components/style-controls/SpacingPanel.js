import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * Spacing inspector panel.
 *
 * @param {Object}      props
 * @param {Object}      props.group         Responsive spacing group: { desktop, tablet, mobile }
 * @param {Function}    props.setAttributes
 * @param {Object|true} props.enabled       true = all on; object = { padding, margin }
 * @param {string}      props.view          'desktop' | 'tablet' | 'mobile'
 */
export default function SpacingPanel({ group, setAttributes, enabled, view }) {
	const { padding, margin } = group[view];

	const show =
		enabled === true ? { padding: true, margin: true } : enabled;

	return (
		<>
			{show.padding && (
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Padding', 'frame-blocks')}
					value={padding || ''}
					placeholder="e.g. 8px 16px"
					help={__('CSS shorthand: top right bottom left.', 'frame-blocks')}
					onChange={(value) =>
						setAttributes({
							spacing: {
								...group,
								[view]: {
									...group[view],
									padding: value,
								},
							},
						})
					}
				/>
			)}
			{show.margin && (
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Margin', 'frame-blocks')}
					value={margin || ''}
					placeholder="e.g. 16px 0"
					help={__('CSS shorthand: top/bottom only.', 'frame-blocks')}
					onChange={(value) =>
						setAttributes({
							spacing: {
								...group,
								[view]: {
									...group[view],
									margin: value,
								},
							},
						})
					}
				/>
			)}
		</>
	);
}
