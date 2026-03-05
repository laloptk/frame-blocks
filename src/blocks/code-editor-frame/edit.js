import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { code, language, editorTheme, fileName } = attributes;

	const blockProps = useBlockProps( {
		className: `wpf-code-editor-frame wpf-code-editor-frame--${ editorTheme }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Editor Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Theme', 'wpframeblocks' ) }
						value={ editorTheme }
						options={ [
							{ label: __( 'Dark', 'wpframeblocks' ), value: 'dark' },
							{ label: __( 'Light', 'wpframeblocks' ), value: 'light' },
						] }
						onChange={ ( value ) => setAttributes( { editorTheme: value } ) }
					/>
					<SelectControl
						label={ __( 'Language', 'wpframeblocks' ) }
						value={ language }
						options={ [
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'TypeScript', value: 'typescript' },
							{ label: 'PHP', value: 'php' },
							{ label: 'CSS', value: 'css' },
							{ label: 'HTML', value: 'html' },
							{ label: 'JSON', value: 'json' },
							{ label: 'Bash', value: 'bash' },
						] }
						onChange={ ( value ) => setAttributes( { language: value } ) }
					/>
					<TextControl
						label={ __( 'File Name', 'wpframeblocks' ) }
						value={ fileName }
						placeholder="index.js"
						onChange={ ( value ) => setAttributes( { fileName: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wpf-code-editor-frame__titlebar">
					<div className="wpf-code-editor-frame__dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
					{ fileName && (
						<span className="wpf-code-editor-frame__filename">
							{ fileName }
						</span>
					) }
					<span className="wpf-code-editor-frame__language">
						{ language }
					</span>
				</div>
				<div className="wpf-code-editor-frame__body">
					<TextareaControl
						label={ __( 'Code', 'wpframeblocks' ) }
						hideLabelFromVision
						value={ code }
						placeholder={ __( 'Paste your code here…', 'wpframeblocks' ) }
						onChange={ ( value ) => setAttributes( { code: value } ) }
						rows={ 10 }
					/>
				</div>
			</div>
		</>
	);
}
