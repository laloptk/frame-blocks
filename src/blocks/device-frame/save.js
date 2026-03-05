import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { deviceType } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wpf-device-frame wpf-device-frame--${ deviceType }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="wpf-device-frame__shell">
				<div className="wpf-device-frame__screen">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
