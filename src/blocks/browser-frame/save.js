import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { url, browserTheme } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wpf-browser-frame wpf-browser-frame--${ browserTheme }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="wpf-browser-frame__chrome">
				<div className="wpf-browser-frame__dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className="wpf-browser-frame__address-bar">
					{ url || 'https://example.com' }
				</div>
			</div>
			<div className="wpf-browser-frame__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
