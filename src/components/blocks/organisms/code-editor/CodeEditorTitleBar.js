import IconSet from '../IconSet';
import FrameIcon from '../FrameIcon';

const MENU_ITEMS = [ 'File', 'Edit', 'Selection', 'View', 'Go', 'Run' ];

const WINDOW_CONTROL_ITEMS = [
	{
		iconClass: 'fa-solid fa-minus',
		modifier: 'wp-block-frames-vscode__win-btn--minimize',
	},
	{
		iconClass: 'fa-regular fa-square',
		modifier: 'wp-block-frames-vscode__win-btn--maximize',
	},
	{
		iconClass: 'fa-solid fa-xmark',
		modifier: 'wp-block-frames-vscode__win-btn--close',
	},
];

export default function CodeEditorTitleBar( { projectName } ) {
	return (
		<div className="wp-block-frames-vscode__titlebar">
			<div className="wp-block-frames-vscode__titlebar-left">
				<span className="wp-block-frames-vscode__logo">
					<FrameIcon iconClass="fa-brands fa-microsoft" />
				</span>
				<nav className="wp-block-frames-vscode__menubar" aria-hidden="true">
					{ MENU_ITEMS.map( ( item ) => (
						<span key={ item } className="wp-block-frames-vscode__menu-item">
							{ item }
						</span>
					) ) }
					<span className="wp-block-frames-vscode__menu-item wp-block-frames-vscode__menu-item--muted">
						...
					</span>
				</nav>
			</div>

			<div className="wp-block-frames-vscode__search" aria-hidden="true">
				<FrameIcon iconClass="fa-solid fa-magnifying-glass" />
				<span>{ projectName }</span>
			</div>

			<IconSet
				containerClassName="wp-block-frames-vscode__win-controls"
				itemClassName="wp-block-frames-vscode__win-btn"
				items={ WINDOW_CONTROL_ITEMS }
				ariaHidden
			/>
		</div>
	);
}
