import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { deviceType } = attributes;

	const blockProps = useBlockProps( {
		className: `wpf-device-frame wpf-device-frame--${ deviceType }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Device Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Device Type', 'wpframeblocks' ) }
						value={ deviceType }
						options={ [
							{ label: __( 'Mobile', 'wpframeblocks' ), value: 'mobile' },
							{ label: __( 'Tablet', 'wpframeblocks' ), value: 'tablet' },
							{ label: __( 'Desktop', 'wpframeblocks' ), value: 'desktop' },
						] }
						onChange={ ( value ) => setAttributes( { deviceType: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wpf-device-frame__shell">
					<div className="wpf-device-frame__screen">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
