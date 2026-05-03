import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { DeviceFrameTemplate } from '@wpfb/frame-components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { deviceType } = attributes;
	const normalizedDeviceType =
		deviceType === 'mobile'
			? 'phone'
			: deviceType === 'desktop'
				? 'laptop'
				: deviceType;

	const blockProps = useBlockProps( {
		className: `wp-block-frames-device wp-block-frames-device--${ normalizedDeviceType }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Device Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Device Type', 'wpframeblocks' ) }
						value={ normalizedDeviceType }
						options={ [
							{ label: __( 'Phone', 'wpframeblocks' ), value: 'phone' },
							{ label: __( 'Tablet', 'wpframeblocks' ), value: 'tablet' },
							{ label: __( 'Laptop', 'wpframeblocks' ), value: 'laptop' },
						] }
						onChange={ ( value ) => setAttributes( { deviceType: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<DeviceFrameTemplate
					deviceType={ normalizedDeviceType }
					renderScreen={ () => <InnerBlocks /> }
				/>
			</div>
		</>
	);
}
