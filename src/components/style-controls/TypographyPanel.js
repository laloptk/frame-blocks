import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, TextControl } from '@wordpress/components';

const FONT_WEIGHTS = [
	{ label: __( 'Default', 'frame-blocks' ), value: '' },
	{ label: __( 'Normal — 400', 'frame-blocks' ), value: '400' },
	{ label: __( 'Medium — 500', 'frame-blocks' ), value: '500' },
	{ label: __( 'Semibold — 600', 'frame-blocks' ), value: '600' },
	{ label: __( 'Bold — 700', 'frame-blocks' ), value: '700' },
];

/**
 * Typography inspector panel.
 *
 * @param {Object}      props
 * @param {Object}      props.group         Responsive typography group: { desktop, tablet, mobile }
 * @param {Function}    props.setAttributes
 * @param {Object|true} props.enabled       true = all on; object = per-control flags
 * @param {string}      props.view          'desktop' | 'tablet' | 'mobile'
 */
export default function TypographyPanel( { group, setAttributes, enabled, view } ) {
	const { fontSize, fontWeight, lineHeight } = group[view];

	const show =
		enabled === true
			? { fontSize: true, fontWeight: true, lineHeight: true }
			: enabled;

	return (
		<>
			{ show.fontSize && (
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Font Size', 'frame-blocks' ) }
					value={ fontSize || '' }
					placeholder="e.g. 14px, 1rem"
					help={ __( 'Any valid CSS font-size value.', 'frame-blocks' ) }
					onChange={ ( value ) =>
						setAttributes({
							typography: {
								...group,
								[view]: {
									...group[view],
									fontSize: value,
								},
							},
						})
					}
				/>
			) }
			{ show.fontWeight && (
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Font Weight', 'frame-blocks' ) }
					value={ fontWeight || '' }
					options={ FONT_WEIGHTS }
					onChange={ ( value ) =>
						setAttributes({
							typography: {
								...group,
								[view]: {
									...group[view],
									fontWeight: value,
								},
							},
						})
					}
				/>
			) }
			{ show.lineHeight && (
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Line Height', 'frame-blocks' ) }
					value={ lineHeight || 1.5 }
					min={ 1 }
					max={ 3 }
					step={ 0.05 }
					onChange={ ( value ) =>
						setAttributes({
							typography: {
								...group,
								[view]: {
									...group[view],
									lineHeight: value,
								},
							},
						})
					}
				/>
			) }
		</>
	);
}
