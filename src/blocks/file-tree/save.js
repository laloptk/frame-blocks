import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { textColor, backgroundColor, typography } = attributes;
	const desktopFontSize = typography?.desktop?.fontSize || '';

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-file-tree',
		style: {
			...( backgroundColor ? { backgroundColor } : {} ),
			...( textColor ? { '--frames-file-tree-text': textColor } : {} ),
			...( desktopFontSize ? { '--frames-file-tree-font-size': desktopFontSize } : {} ),
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
