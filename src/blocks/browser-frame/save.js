import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BrowserFrameTemplate } from '@wpfb/components';
import { buildInlineStyle } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { browserVariant, url, tabTitle } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-${ browserVariant }`,
		style: buildInlineStyle( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<BrowserFrameTemplate
				browserVariant={ browserVariant }
				url={ url }
				tabTitle={ tabTitle }
				renderViewport={ () => <InnerBlocks.Content /> }
			/>
		</div>
	);
}
