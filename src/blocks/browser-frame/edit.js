import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { StyleControls } from '@wpfb/components';
import { BrowserFrameTemplate } from '@wpfb/frame-components';
import { buildInlineStyle } from '@wpfb/helpers';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { browserVariant, url, tabTitle } = attributes;

	const blockProps = useBlockProps( {
		className: `wp-block-frames-${ browserVariant }`,
		style: buildInlineStyle( attributes ),
	} );

	return (
		<>
			<StyleControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				enable={ {
					spacing: true,
					border: true,
				} }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Browser Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Browser', 'wpframeblocks' ) }
						value={ browserVariant }
						options={ [
							{ label: 'Safari', value: 'safari' },
							{ label: 'Chrome', value: 'chrome' },
						] }
						onChange={ ( value ) =>
							setAttributes( { browserVariant: value } )
						}
					/>
					<TextControl
						label={ __( 'URL', 'wpframeblocks' ) }
						value={ url }
						placeholder="example.com"
						onChange={ ( value ) => setAttributes( { url: value } ) }
					/>
					<TextControl
						label={ __( 'Tab Title', 'wpframeblocks' ) }
						value={ tabTitle }
						placeholder={ __( 'My Page', 'wpframeblocks' ) }
						onChange={ ( value ) =>
							setAttributes( { tabTitle: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<BrowserFrameTemplate
					browserVariant={ browserVariant }
					url={ url }
					tabTitle={ tabTitle || __( 'My Page', 'wpframeblocks' ) }
					renderViewport={ () => (
						<InnerBlocks renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> } />
					) }
				/>
			</div>
		</>
	);
}
