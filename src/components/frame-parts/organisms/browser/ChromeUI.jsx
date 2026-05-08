import FrameIcon from '../../organisms/FrameIcon';
import IconSet from '../../organisms/IconSet';

const WINDOW_CONTROL_ITEMS = [
	{ iconClass: 'fa-solid fa-minus', modifier: 'wp-block-frames-chrome__win-btn--min' },
	{ iconClass: 'fa-regular fa-square', modifier: 'wp-block-frames-chrome__win-btn--max' },
	{ iconClass: 'fa-solid fa-xmark', modifier: 'wp-block-frames-chrome__win-btn--close' },
];

const NAV_ITEMS = [
	{ iconClass: 'fa-solid fa-arrow-left', modifier: 'wp-block-frames-chrome__nav-btn--disabled' },
	{ iconClass: 'fa-solid fa-arrow-right', modifier: 'wp-block-frames-chrome__nav-btn--disabled' },
	{ iconClass: 'fa-solid fa-rotate-right' },
];

const TOOLBAR_RIGHT_ITEMS = [
	{ iconClass: 'fa-solid fa-puzzle-piece' },
	{ iconClass: 'fa-solid fa-ellipsis-vertical' },
];

export default function ChromeUI( { url, tabTitle } ) {
	return (
		<div className="wp-block-frames-chrome__chrome">
			<div className="wp-block-frames-chrome__tabstrip">
				<div className="wp-block-frames-chrome__tabs">
					<div className="wp-block-frames-chrome__tab wp-block-frames-chrome__tab--active">
						<div className="wp-block-frames-chrome__tab-favicon wp-block-frames-chrome__tab-favicon--google">
							<FrameIcon iconClass="fa-brands fa-google" />
						</div>
						<span className="wp-block-frames-chrome__tab-title">
							{ tabTitle || 'My Page' }
						</span>
						<div className="wp-block-frames-chrome__tab-close">
							<FrameIcon iconClass="fa-solid fa-xmark" />
						</div>
					</div>
				</div>

				<div className="wp-block-frames-chrome__tab-new">
					<FrameIcon iconClass="fa-solid fa-plus" />
				</div>

				<IconSet
					containerClassName="wp-block-frames-chrome__win-controls"
					itemClassName="wp-block-frames-chrome__win-btn"
					items={ WINDOW_CONTROL_ITEMS }
				/>
			</div>

			<div className="wp-block-frames-chrome__toolbar">
				<IconSet
					containerClassName="wp-block-frames-chrome__nav"
					itemClassName="wp-block-frames-chrome__nav-btn"
					items={ NAV_ITEMS }
				/>

				<div className="wp-block-frames-chrome__omnibox">
					<FrameIcon iconClass="wp-block-frames-chrome__omnibox-lock fa-solid fa-lock" />
					<span className="wp-block-frames-chrome__omnibox-url">
						{ url || 'example.com' }
					</span>
					<FrameIcon iconClass="wp-block-frames-chrome__omnibox-star fa-regular fa-star" />
				</div>

				<div className="wp-block-frames-chrome__toolbar-right">
					<div className="wp-block-frames-chrome__toolbar-icon">
						<FrameIcon iconClass={ TOOLBAR_RIGHT_ITEMS[0].iconClass } />
					</div>
					<div className="wp-block-frames-chrome__profile">G</div>
					<div className="wp-block-frames-chrome__toolbar-icon">
						<FrameIcon iconClass={ TOOLBAR_RIGHT_ITEMS[1].iconClass } />
					</div>
				</div>
			</div>
		</div>
	);
}
