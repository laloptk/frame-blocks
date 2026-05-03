import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { SpacingPanel, BorderPanel, TypographyPanel, ResponsiveControls } from '@wpfb/components';
import { BrowserFrameTemplate } from '@wpfb/frame-components';
import { buildResponsiveStyles, useDeviceType } from '@wpfb/helpers';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { browserVariant, url, tabTitle, spacing, border, typography } = attributes;
	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const [typographyView, setTypographyView] = useState('desktop');
	const deviceType = useDeviceType();

	const blockProps = useBlockProps( {
		className: `wp-block-frames-${ browserVariant }`,
		style: buildResponsiveStyles( attributes, deviceType ),
	} );

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={__('Spacing', 'wpframeblocks')}
					view={spacingView}
					handleView={ setSpacingView }
				>
					<SpacingPanel
						group={spacing}
						setAttributes={setAttributes}
						enabled={true}
						view={spacingView}
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={__('Border', 'wpframeblocks')}
					view={borderView}
					handleView={ setBorderView }
				>
					<BorderPanel
						group={border}
						setAttributes={setAttributes}
						enabled={true}
						view={borderView}
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={__('Typography', 'wpframeblocks')}
					view={typographyView}
					handleView={ setTypographyView }
				>
					<TypographyPanel
						group={typography}
						setAttributes={setAttributes}
						enabled={true}
						view={typographyView}
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
