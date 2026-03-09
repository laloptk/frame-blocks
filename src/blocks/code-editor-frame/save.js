import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { VSCodeFrameTemplate } from '@wpfb/components';
import { buildInlineStyle } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { projectName, fileName, filePath, language, branch } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-vscode',
		style: buildInlineStyle( attributes ),
		role: 'img',
		'aria-label': `VS Code editor - ${ projectName }`,
	} );

	return (
		<div { ...blockProps }>
			<VSCodeFrameTemplate
				projectName={ projectName }
				fileName={ fileName }
				filePath={ filePath }
				language={ language }
				branch={ branch }
				renderInnerZones={ () => <InnerBlocks.Content /> }
			/>
		</div>
	);
}
