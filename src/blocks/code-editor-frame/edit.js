import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { StyleControls, VSCodeFrameTemplate } from '@wpfb/components';
import { buildInlineStyle } from '@wpfb/helpers';

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
			padding: '0 0 0 15px',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { projectName, fileName, filePath, language, branch } = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-frames-vscode',
		style: buildInlineStyle( attributes ),
		role: 'img',
		'aria-label': `VS Code editor - ${ projectName }`,
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
