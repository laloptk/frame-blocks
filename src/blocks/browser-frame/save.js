import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BrowserFrameTemplate } from '@wpfb/frame-components';
import { buildResponsiveStyles } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { browserVariant, url, tabTitle } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-${ browserVariant }`,
		style: buildResponsiveStyles( attributes, 'Desktop' ),
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
