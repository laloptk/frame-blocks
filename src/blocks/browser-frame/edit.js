import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { SpacingPanel, BorderPanel } from '@wpfb/components';
import { BrowserFrameTemplate } from '@wpfb/frame-components';
import { buildInlineStyle } from '@wpfb/helpers';
import ResponsiveControls from '@wpfb/components/style-controls/ResponsiveControls';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { browserVariant, url, tabTitle, spacing, border } = attributes;
	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	
	const blockProps = useBlockProps( {
		className: `wp-block-frames-${ browserVariant }`,
		style: buildInlineStyle( attributes ),
	} );

	const handleSpacingView = (screenView) => {
		setSpacingView(screenView);
	};

	const handleBorderView = (screenView) => {
		setBorderView(screenView);
	};

	return (
		<>
			<InspectorControls>
				<ResponsiveControls 
					panelTitle={__("Spacing", 'wpframeblocks')}
					view={spacingView ?? "desktop"}
					handleView={ handleSpacingView }
				>
					<SpacingPanel 
						attributes={spacing} 
						setAttributes={setAttributes} 
						enabled={true}
						view={spacingView ?? 'desktop'}
					/>
				</ResponsiveControls>
				<ResponsiveControls 
					panelTitle={__("Border", "wpframeblocks")}
					view={borderView ?? "desktop"}
					handleView={ handleBorderView }
				>
					<BorderPanel 
						attributes={border} 
						setAttributes={setAttributes} 
						enabled={true}
						view={borderView ?? 'desktop'}
					/>
				</ResponsiveControls>
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
