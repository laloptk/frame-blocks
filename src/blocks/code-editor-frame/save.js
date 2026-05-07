import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { VSCodeFrameTemplate } from '@wpfb/frame-components';
import { buildVisibilityClasses, buildResponsiveStyles } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { projectName, fileName, filePath, language, branch, visibility, spacing, border } = attributes;
	const visibilityClasses = buildVisibilityClasses( visibility );

	const blockProps = useBlockProps.save( {
		className: [ 'wp-block-frames-vscode', visibilityClasses ].filter( Boolean ).join( ' ' ),
		role: 'img',
		'aria-label': `VS Code editor - ${ projectName }`,
		style: buildResponsiveStyles( { spacing, border }, 'Desktop' ),
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
