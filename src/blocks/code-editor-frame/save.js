import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { code, language, editorTheme, fileName } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wpf-code-editor-frame wpf-code-editor-frame--${ editorTheme }`,
	} );

	return (
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
				<pre>
					<code className={ `language-${ language }` }>{ code }</code>
				</pre>
			</div>
		</div>
	);
}
