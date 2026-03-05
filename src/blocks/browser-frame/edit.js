import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { url, browserTheme } = attributes;

	const blockProps = useBlockProps( {
		className: `wpf-browser-frame wpf-browser-frame--${ browserTheme }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Browser Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Theme', 'wpframeblocks' ) }
						value={ browserTheme }
						options={ [
							{ label: __( 'Light', 'wpframeblocks' ), value: 'light' },
							{ label: __( 'Dark', 'wpframeblocks' ), value: 'dark' },
						] }
						onChange={ ( value ) => setAttributes( { browserTheme: value } ) }
					/>
					<TextControl
						label={ __( 'URL', 'wpframeblocks' ) }
						value={ url }
						placeholder="https://example.com"
						onChange={ ( value ) => setAttributes( { url: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wpf-browser-frame__chrome">
					<div className="wpf-browser-frame__dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className="wpf-browser-frame__address-bar">
						{ url || 'https://example.com' }
					</div>
				</div>
				<div className="wpf-browser-frame__content">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
