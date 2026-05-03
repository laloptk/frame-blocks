import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { DeviceFrameTemplate } from '@wpfb/frame-components';

export default function save( { attributes } ) {
	const { deviceType } = attributes;
	const normalizedDeviceType =
		deviceType === 'mobile'
			? 'phone'
			: deviceType === 'desktop'
				? 'laptop'
				: deviceType;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-device wp-block-frames-device--${ normalizedDeviceType }`,
	} );

	return (
		<div { ...blockProps }>
			<DeviceFrameTemplate
				deviceType={ normalizedDeviceType }
				renderScreen={ () => <InnerBlocks.Content /> }
			/>
		</div>
	);
}
