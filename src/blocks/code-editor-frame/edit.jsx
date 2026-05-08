import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { SpacingPanel, BorderPanel, VisibilityPanel, ResponsiveControls } from '@wpfb/components';
import { VSCodeFrameTemplate } from '@wpfb/frame-components';
import { buildResponsiveStyles, resolveResponsiveValue, useDeviceType } from '@wpfb/helpers';

import './editor.scss';

// Each zone is individually locked (move + remove) so the 3-panel layout
// stays intact without locking nested InnerBlocks in child blocks.
const TEMPLATE = [
	['frameblocks/file-tree', { lock: { move: true, remove: true } }],
	[
		'frameblocks/code-syntax-highlighter',
		{
			className: 'wp-block-frames-vscode__code-zone',
			lock: { move: true, remove: true },
		},
	],
	[
		'frameblocks/code-syntax-highlighter',
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

export default function Edit({ attributes, setAttributes }) {
	const { 
		projectName, 
		fileName, 
		filePath, 
		language, 
		branch, 
		spacing, 
		border, 
		visibility
	} = attributes;
	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const [visibilityView, setVisibilityView] = useState('desktop');
	const deviceType = useDeviceType();

	const showSidebar = resolveResponsiveValue(visibility, 'showSidebar', deviceType) ?? true;
	const showTerminal = resolveResponsiveValue(visibility, 'showTerminal', deviceType) ?? true;

	const blockProps = useBlockProps({
		className: [
			'wp-block-frames-vscode',
			!showSidebar && 'has-no-sidebar',
			!showTerminal && 'has-no-terminal',
		].filter(Boolean).join(' '),
		style: buildResponsiveStyles(attributes, deviceType),
		role: 'img',
		'aria-label': `VS Code editor - ${projectName}`,
	});

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={__('Spacing', 'frame-blocks')}
					view={spacingView}
					handleView={setSpacingView}
				>
					<SpacingPanel
						attributes={spacing}
						setAttributes={setAttributes}
						enabled={true}
						view={spacingView}
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={__('Border', 'frame-blocks')}
					view={borderView}
					handleView={setBorderView}
				>
					<BorderPanel
						attributes={border}
						setAttributes={setAttributes}
						enabled={true}
						view={borderView}
					/>
				</ResponsiveControls>
				<PanelBody title={__('Editor Settings', 'frame-blocks')}>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Project Name', 'frame-blocks')}
						value={projectName}
						onChange={(value) => setAttributes({ projectName: value })}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('File Name', 'frame-blocks')}
						value={fileName}
						placeholder="index.ts"
						onChange={(value) => setAttributes({ fileName: value })}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('File Path', 'frame-blocks')}
						value={filePath}
						placeholder="src/components"
						help={__(
							'Slash-separated path shown in the breadcrumb, e.g. src/components',
							'frame-blocks'
						)}
						onChange={(value) => setAttributes({ filePath: value })}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Language', 'frame-blocks')}
						value={language}
						placeholder="TypeScript JSX"
						onChange={(value) => setAttributes({ language: value })}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Branch', 'frame-blocks')}
						value={branch}
						placeholder="main"
						onChange={(value) => setAttributes({ branch: value })}
					/>
				</PanelBody>
				<ResponsiveControls
					panelTitle={__('Visibility', 'frame-blocks')}
					view={visibilityView}
					handleView={setVisibilityView}
				>
					<VisibilityPanel 
						group={visibility}
						setAttributes={setAttributes}
						enabled={true}
						view={visibilityView}
					/>
				</ResponsiveControls>
			</InspectorControls>

			<div {...blockProps}>
				<VSCodeFrameTemplate
					projectName={projectName}
					fileName={fileName}
					filePath={filePath}
					language={language}
					branch={branch}
					renderInnerZones={() => <InnerBlocks template={TEMPLATE} />}
				/>
			</div>
		</>
	);
}
