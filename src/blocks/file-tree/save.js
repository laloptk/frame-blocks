import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { buildInlineStyle } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { textColor, fontSize } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-file-tree',
		style: {
			...buildInlineStyle( attributes ),
			...( textColor ? { '--frames-file-tree-text': textColor } : {} ),
			...( fontSize ? { '--frames-file-tree-font-size': fontSize } : {} ),
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
