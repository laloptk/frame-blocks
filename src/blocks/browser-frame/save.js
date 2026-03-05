import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

function SafariChrome( { url, tabTitle } ) {
	return (
		<div className="wp-block-frames-safari__chrome">
			<div className="wp-block-frames-safari__toolbar">
				<div className="wp-block-frames-safari__traffic">
					<div className="wp-block-frames-safari__btn wp-block-frames-safari__btn--close">
						<i className="fa-solid fa-xmark"></i>
					</div>
					<div className="wp-block-frames-safari__btn wp-block-frames-safari__btn--min">
						<i className="fa-solid fa-minus"></i>
					</div>
					<div className="wp-block-frames-safari__btn wp-block-frames-safari__btn--max">
						<i className="fa-solid fa-up-right-and-down-left-from-center"></i>
					</div>
				</div>

				<div className="wp-block-frames-safari__nav">
					<i className="fa-solid fa-chevron-left"></i>
					<i className="fa-solid fa-chevron-right"></i>
				</div>

				<div className="wp-block-frames-safari__tabs">
					<div className="wp-block-frames-safari__tab wp-block-frames-safari__tab--active">
						<i className="fa-solid fa-lock"></i>
						<span>{ tabTitle || 'My Page' }</span>
					</div>
				</div>

				<div className="wp-block-frames-safari__toolbar-right">
					<i className="fa-solid fa-share-from-square"></i>
					<i className="fa-solid fa-plus"></i>
					<i className="fa-regular fa-clone"></i>
				</div>
			</div>

			<div className="wp-block-frames-safari__addressbar">
				<i className="wp-block-frames-safari__bar-icon fa-solid fa-shield-halved"></i>
				<i className="wp-block-frames-safari__bar-icon fa-solid fa-text-slash"></i>
				<div className="wp-block-frames-safari__address">
					<i className="fa-solid fa-lock"></i>
					<span>{ url || 'example.com' }</span>
					<i className="fa-solid fa-rotate wp-block-frames-safari__address-reload"></i>
				</div>
				<i className="wp-block-frames-safari__bar-icon fa-regular fa-bookmark"></i>
			</div>
		</div>
	);
}

function ChromeChrome( { url, tabTitle } ) {
	return (
		<div className="wp-block-frames-chrome__chrome">
			<div className="wp-block-frames-chrome__tabstrip">
				<div className="wp-block-frames-chrome__tabs">
					<div className="wp-block-frames-chrome__tab wp-block-frames-chrome__tab--active">
						<div className="wp-block-frames-chrome__tab-favicon wp-block-frames-chrome__tab-favicon--google">
							<i className="fa-brands fa-google"></i>
						</div>
						<span className="wp-block-frames-chrome__tab-title">
							{ tabTitle || 'My Page' }
						</span>
						<div className="wp-block-frames-chrome__tab-close">
							<i className="fa-solid fa-xmark"></i>
						</div>
					</div>
				</div>

				<div className="wp-block-frames-chrome__tab-new">
					<i className="fa-solid fa-plus"></i>
				</div>

				<div className="wp-block-frames-chrome__win-controls">
					<div className="wp-block-frames-chrome__win-btn wp-block-frames-chrome__win-btn--min">
						<i className="fa-solid fa-minus"></i>
					</div>
					<div className="wp-block-frames-chrome__win-btn wp-block-frames-chrome__win-btn--max">
						<i className="fa-regular fa-square"></i>
					</div>
					<div className="wp-block-frames-chrome__win-btn wp-block-frames-chrome__win-btn--close">
						<i className="fa-solid fa-xmark"></i>
					</div>
				</div>
			</div>

			<div className="wp-block-frames-chrome__toolbar">
				<div className="wp-block-frames-chrome__nav">
					<div className="wp-block-frames-chrome__nav-btn wp-block-frames-chrome__nav-btn--disabled">
						<i className="fa-solid fa-arrow-left"></i>
					</div>
					<div className="wp-block-frames-chrome__nav-btn wp-block-frames-chrome__nav-btn--disabled">
						<i className="fa-solid fa-arrow-right"></i>
					</div>
					<div className="wp-block-frames-chrome__nav-btn">
						<i className="fa-solid fa-rotate-right"></i>
					</div>
				</div>

				<div className="wp-block-frames-chrome__omnibox">
					<i className="wp-block-frames-chrome__omnibox-lock fa-solid fa-lock"></i>
					<span className="wp-block-frames-chrome__omnibox-url">
						{ url || 'example.com' }
					</span>
					<i className="wp-block-frames-chrome__omnibox-star fa-regular fa-star"></i>
				</div>

				<div className="wp-block-frames-chrome__toolbar-right">
					<div className="wp-block-frames-chrome__toolbar-icon">
						<i className="fa-solid fa-puzzle-piece"></i>
					</div>
					<div className="wp-block-frames-chrome__profile">G</div>
					<div className="wp-block-frames-chrome__toolbar-icon">
						<i className="fa-solid fa-ellipsis-vertical"></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function save( { attributes } ) {
	const { browserVariant, url, tabTitle } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-${ browserVariant }`,
	} );

	return (
		<div { ...blockProps }>
			{ browserVariant === 'safari' ? (
				<SafariChrome url={ url } tabTitle={ tabTitle } />
			) : (
				<ChromeChrome url={ url } tabTitle={ tabTitle } />
			) }

			<div className={ `wp-block-frames-${ browserVariant }__viewport` }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
