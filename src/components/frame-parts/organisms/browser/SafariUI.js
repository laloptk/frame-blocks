import FrameIcon from '../../organisms/FrameIcon';
import IconSet from '../../organisms/IconSet';

const TRAFFIC_ITEMS = [
	{ iconClass: 'fa-solid fa-xmark', modifier: 'wp-block-frames-safari__btn--close' },
	{ iconClass: 'fa-solid fa-minus', modifier: 'wp-block-frames-safari__btn--min' },
	{
		iconClass: 'fa-solid fa-up-right-and-down-left-from-center',
		modifier: 'wp-block-frames-safari__btn--max',
	},
];

const NAV_ITEMS = [
	{ iconClass: 'fa-solid fa-chevron-left' },
	{ iconClass: 'fa-solid fa-chevron-right' },
];

const TOOLBAR_RIGHT_ITEMS = [
	{ iconClass: 'fa-solid fa-share-from-square' },
	{ iconClass: 'fa-solid fa-plus' },
	{ iconClass: 'fa-regular fa-clone' },
];

export default function SafariUI( { url, tabTitle } ) {
	return (
		<div className="wp-block-frames-safari__chrome">
			<div className="wp-block-frames-safari__toolbar">
				<IconSet
					containerClassName="wp-block-frames-safari__traffic"
					itemClassName="wp-block-frames-safari__btn"
					items={ TRAFFIC_ITEMS }
				/>

				<IconSet
					containerClassName="wp-block-frames-safari__nav"
					itemClassName=""
					items={ NAV_ITEMS }
				/>

				<div className="wp-block-frames-safari__tabs">
					<div className="wp-block-frames-safari__tab wp-block-frames-safari__tab--active">
						<FrameIcon iconClass="fa-solid fa-lock" />
						<span>{ tabTitle || 'My Page' }</span>
					</div>
				</div>

				<IconSet
					containerClassName="wp-block-frames-safari__toolbar-right"
					itemClassName=""
					items={ TOOLBAR_RIGHT_ITEMS }
				/>
			</div>

			<div className="wp-block-frames-safari__addressbar">
				<FrameIcon iconClass="wp-block-frames-safari__bar-icon fa-solid fa-shield-halved" />
				<FrameIcon iconClass="wp-block-frames-safari__bar-icon fa-solid fa-text-slash" />
				<div className="wp-block-frames-safari__address">
					<FrameIcon iconClass="fa-solid fa-lock" />
					<span>{ url || 'example.com' }</span>
					<FrameIcon iconClass="fa-solid fa-rotate wp-block-frames-safari__address-reload" />
				</div>
				<FrameIcon iconClass="wp-block-frames-safari__bar-icon fa-regular fa-bookmark" />
			</div>
		</div>
	);
}
