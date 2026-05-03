import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { SpacingPanel, BorderPanel, ResponsiveControls } from '@wpfb/components';
import { VSCodeFrameTemplate } from '@wpfb/frame-components';
import { buildResponsiveStyles, useDeviceType } from '@wpfb/helpers';

import './editor.scss';

// Each zone is individually locked (move + remove) so the 3-panel layout
// stays intact without locking nested InnerBlocks in child blocks.
const TEMPLATE = [
	[ 'wpframeblocks/file-tree', { lock: { move: true, remove: true } } ],
	[
		'wpframeblocks/code-syntax-highlighter',
		{
			className: 'wp-block-frames-vscode__code-zone',
			lock: { move: true, remove: true },
		},
	],
	[
		'wpframeblocks/code-syntax-highlighter',
		{
			className: 'wp-block-frames-vscode__terminal-zone',
			lock: { move: true, remove: true },
			isTerminal: true,
			spacing: {
				desktop: { padding: '0 0 0 15px', margin: '' },
				tablet: { padding: '', margin: '' },
				mobile: { padding: '', margin: '' },
			},
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { projectName, fileName, filePath, language, branch, spacing, border } = attributes;
	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const deviceType = useDeviceType();

	const blockProps = useBlockProps( {
		className: 'wp-block-frames-vscode',
		style: buildResponsiveStyles( attributes, deviceType ),
		role: 'img',
		'aria-label': `VS Code editor - ${ projectName }`,
	} );

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={ __( 'Spacing', 'wpframeblocks' ) }
					view={ spacingView }
					handleView={ setSpacingView }
				>
					<SpacingPanel
						attributes={ spacing }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ spacingView }
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={ __( 'Border', 'wpframeblocks' ) }
					view={ borderView }
					handleView={ setBorderView }
				>
					<BorderPanel
						attributes={ border }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ borderView }
					/>
				</ResponsiveControls>
				<PanelBody title={ __( 'Editor Settings', 'wpframeblocks' ) }>
					<TextControl
						label={ __( 'Project Name', 'wpframeblocks' ) }
						value={ projectName }
						onChange={ ( value ) => setAttributes( { projectName: value } ) }
					/>
					<TextControl
						label={ __( 'File Name', 'wpframeblocks' ) }
						value={ fileName }
						placeholder="index.ts"
						onChange={ ( value ) => setAttributes( { fileName: value } ) }
					/>
					<TextControl
						label={ __( 'File Path', 'wpframeblocks' ) }
						value={ filePath }
						placeholder="src/components"
						help={ __(
							'Slash-separated path shown in the breadcrumb, e.g. src/components',
							'wpframeblocks'
						) }
						onChange={ ( value ) => setAttributes( { filePath: value } ) }
					/>
					<TextControl
						label={ __( 'Language', 'wpframeblocks' ) }
						value={ language }
						placeholder="TypeScript JSX"
						onChange={ ( value ) => setAttributes( { language: value } ) }
					/>
					<TextControl
						label={ __( 'Branch', 'wpframeblocks' ) }
						value={ branch }
						placeholder="main"
						onChange={ ( value ) => setAttributes( { branch: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<VSCodeFrameTemplate
					projectName={ projectName }
					fileName={ fileName }
					filePath={ filePath }
					language={ language }
					branch={ branch }
					renderInnerZones={ () => <InnerBlocks template={ TEMPLATE } /> }
				/>
			</div>
		</>
	);
}
