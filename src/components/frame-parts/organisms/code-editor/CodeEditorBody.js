import { getFileIcon, parseBreadcrumb } from '@wpfb/helpers';
import IconSet from '../IconSet';
import FrameIcon from '../FrameIcon';

const ACTIVITY_TOP_ITEMS = [
	{
		iconClass: 'fa-regular fa-copy',
		modifier: 'wp-block-frames-vscode__activity-btn--active',
	},
	{ iconClass: 'fa-solid fa-magnifying-glass' },
	{ iconClass: 'fa-solid fa-code-branch' },
	{ iconClass: 'fa-solid fa-bug' },
	{ iconClass: 'fa-solid fa-puzzle-piece' },
	{ iconClass: 'fa-solid fa-display' },
];

const ACTIVITY_BOTTOM_ITEMS = [
	{ iconClass: 'fa-regular fa-circle-user' },
	{ iconClass: 'fa-solid fa-gear' },
];
const PANEL_ACTION_ITEMS = [
	{ iconClass: 'fa-solid fa-plus' },
	{ iconClass: 'fa-solid fa-chevron-down' },
	{ iconClass: 'fa-solid fa-xmark' },
];

export default function CodeEditorBody( { fileName, filePath, renderInnerZones } ) {
	const { iconClass, colorClass } = getFileIcon( fileName );
	const crumbs = parseBreadcrumb( filePath, fileName );

	return (
		<div className="wp-block-frames-vscode__body">
			<div className="wp-block-frames-vscode__activity" aria-hidden="true">
				<IconSet
					containerClassName="wp-block-frames-vscode__activity-top"
					itemClassName="wp-block-frames-vscode__activity-btn"
					items={ ACTIVITY_TOP_ITEMS }
				/>
				<IconSet
					containerClassName="wp-block-frames-vscode__activity-bottom"
					itemClassName="wp-block-frames-vscode__activity-btn"
					items={ ACTIVITY_BOTTOM_ITEMS }
				/>
			</div>

			<div className="wp-block-frames-vscode__inner-zones">
				<div className="wp-block-frames-vscode__tabs">
					<div className="wp-block-frames-vscode__tab wp-block-frames-vscode__tab--active">
						<FrameIcon
							iconClass={ `wp-block-frames-vscode__tab-icon ${ iconClass } ${ colorClass }`.trim() }
						/>
						<span>{ fileName }</span>
						<FrameIcon iconClass="wp-block-frames-vscode__tab-close fa-solid fa-xmark" />
					</div>
				</div>

				<div className="wp-block-frames-vscode__breadcrumb">
					{ crumbs.map( ( crumb, idx ) => (
						<span key={ idx }>
							{ idx > 0 && (
								<span className="wp-block-frames-vscode__crumb-sep">
									<FrameIcon iconClass="fa-solid fa-chevron-right" />
								</span>
							) }
							<span
								className={ [
									'wp-block-frames-vscode__crumb',
									crumb.active ? 'wp-block-frames-vscode__crumb--active' : '',
								]
									.filter( Boolean )
									.join( ' ' ) }
							>
								{ crumb.label }
							</span>
						</span>
					) ) }
				</div>

				<div className="wp-block-frames-vscode__panel-head" aria-hidden="true">
					<div className="wp-block-frames-vscode__panel-tabs-left">
						<div className="wp-block-frames-vscode__panel-tab">PROBLEMS</div>
						<div className="wp-block-frames-vscode__panel-tab">OUTPUT</div>
						<div className="wp-block-frames-vscode__panel-tab wp-block-frames-vscode__panel-tab--active">
							TERMINAL
						</div>
					</div>
					<div className="wp-block-frames-vscode__panel-actions">
						<IconSet
							withoutContainer
							itemClassName=""
							items={ PANEL_ACTION_ITEMS }
						/>
					</div>
				</div>

				{ renderInnerZones() }
			</div>
		</div>
	);
}
