import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildResponsiveStyles } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { textColor, backgroundColor, typography, spacing, border } = attributes;
	const desktopFontSize = typography?.desktop?.fontSize || '';

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-file-tree',
		style: {
			...( backgroundColor ? { backgroundColor } : {} ),
			...( textColor ? { '--frames-file-tree-text': textColor } : {} ),
			// CSS var keeps icon sizing in SCSS working; spacing/border come from helper.
			...( desktopFontSize ? { '--frames-file-tree-font-size': desktopFontSize } : {} ),
			...buildResponsiveStyles( { spacing, border }, 'Desktop' ),
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
