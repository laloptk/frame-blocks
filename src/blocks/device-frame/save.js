import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { DeviceFrameTemplate } from '@wpfb/components';

export default function save( { attributes } ) {
	const { deviceType } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wpf-device-frame wpf-device-frame--${ deviceType }`,
	} );

	return (
		<div { ...blockProps }>
			<DeviceFrameTemplate renderScreen={ () => <InnerBlocks.Content /> } />
		</div>
	);
}
