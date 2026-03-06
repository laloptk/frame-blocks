import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { getFileIcon, parseBreadcrumb } from '@wpfb/helpers';

const MENU_ITEMS = [ 'File', 'Edit', 'Selection', 'View', 'Go', 'Run' ];

export default function save( { attributes } ) {
	const { projectName, fileName, filePath, language, branch } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-vscode',
		role: 'img',
		'aria-label': `VS Code editor — ${ projectName }`,
	} );

	const { iconClass, colorClass } = getFileIcon( fileName );
	const crumbs = parseBreadcrumb( filePath, fileName );

	return (
		<div { ...blockProps }>
			{ /* ── Titlebar ── */ }
			<div className="wp-block-frames-vscode__titlebar">
				<div className="wp-block-frames-vscode__titlebar-left">
					<span className="wp-block-frames-vscode__logo">
						<i className="fa-brands fa-microsoft"></i>
					</span>
					<nav
						className="wp-block-frames-vscode__menubar"
						aria-hidden="true"
					>
						{ MENU_ITEMS.map( ( item ) => (
							<span
								key={ item }
								className="wp-block-frames-vscode__menu-item"
							>
								{ item }
							</span>
						) ) }
						<span className="wp-block-frames-vscode__menu-item wp-block-frames-vscode__menu-item--muted">
							···
						</span>
					</nav>
				</div>

				<div
					className="wp-block-frames-vscode__search"
					aria-hidden="true"
				>
					<i className="fa-solid fa-magnifying-glass"></i>
					<span>{ projectName }</span>
				</div>

				<div
					className="wp-block-frames-vscode__win-controls"
					aria-hidden="true"
				>
					<div className="wp-block-frames-vscode__win-btn wp-block-frames-vscode__win-btn--minimize">
						<i className="fa-solid fa-minus"></i>
					</div>
					<div className="wp-block-frames-vscode__win-btn wp-block-frames-vscode__win-btn--maximize">
						<i className="fa-regular fa-square"></i>
					</div>
					<div className="wp-block-frames-vscode__win-btn wp-block-frames-vscode__win-btn--close">
						<i className="fa-solid fa-xmark"></i>
					</div>
				</div>
			</div>

			{ /* ── Body ── */ }
			<div className="wp-block-frames-vscode__body">

				{ /* Activity bar — far left, decorative */ }
				<div
					className="wp-block-frames-vscode__activity"
					aria-hidden="true"
				>
					<div className="wp-block-frames-vscode__activity-top">
						<div className="wp-block-frames-vscode__activity-btn wp-block-frames-vscode__activity-btn--active">
							<i className="fa-regular fa-copy"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-magnifying-glass"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-code-branch"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-bug"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-puzzle-piece"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-display"></i>
						</div>
					</div>
					<div className="wp-block-frames-vscode__activity-bottom">
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-regular fa-circle-user"></i>
						</div>
						<div className="wp-block-frames-vscode__activity-btn">
							<i className="fa-solid fa-gear"></i>
						</div>
					</div>
				</div>

				{ /* Inner zones — 2-col × 5-row CSS grid */ }
				<div className="wp-block-frames-vscode__inner-zones">

					{ /* Tabs — grid-area: tabs */ }
					<div className="wp-block-frames-vscode__tabs">
						<div className="wp-block-frames-vscode__tab wp-block-frames-vscode__tab--active">
							<i
								className={ `wp-block-frames-vscode__tab-icon ${ iconClass } ${ colorClass }`.trim() }
							></i>
							<span>{ fileName }</span>
							<i className="wp-block-frames-vscode__tab-close fa-solid fa-xmark"></i>
						</div>
					</div>

					{ /* Breadcrumb — grid-area: crumb */ }
					<div className="wp-block-frames-vscode__breadcrumb">
						{ crumbs.map( ( crumb, idx ) => (
							<span key={ idx }>
								{ idx > 0 && (
									<span className="wp-block-frames-vscode__crumb-sep">
										<i className="fa-solid fa-chevron-right"></i>
									</span>
								) }
								<span
									className={ [
										'wp-block-frames-vscode__crumb',
										crumb.active
											? 'wp-block-frames-vscode__crumb--active'
											: '',
									]
										.filter( Boolean )
										.join( ' ' ) }
								>
									{ crumb.label }
								</span>
							</span>
						) ) }
					</div>

					{ /* Panel header — grid-area: panel-head */ }
					<div
						className="wp-block-frames-vscode__panel-head"
						aria-hidden="true"
					>
						<div className="wp-block-frames-vscode__panel-tabs-left">
							<div className="wp-block-frames-vscode__panel-tab">
								PROBLEMS
							</div>
							<div className="wp-block-frames-vscode__panel-tab">
								OUTPUT
							</div>
							<div className="wp-block-frames-vscode__panel-tab wp-block-frames-vscode__panel-tab--active">
								TERMINAL
							</div>
						</div>
						<div className="wp-block-frames-vscode__panel-actions">
							<i className="fa-solid fa-plus"></i>
							<i className="fa-solid fa-chevron-down"></i>
							<i className="fa-solid fa-xmark"></i>
						</div>
					</div>

					{ /* InnerBlocks.Content — outputs direct children into the grid:
					   - .wp-block-list (.tree-list)      → grid-area: sidebar (LEFT column)
					   - .__code-zone                     → grid-area: code
					   - .__terminal-zone                 → grid-area: terminal
					*/ }
					<InnerBlocks.Content />
				</div>
			</div>

			{ /* ── Status bar ── */ }
			<div className="wp-block-frames-vscode__statusbar">
				<div className="wp-block-frames-vscode__status-left">
					<div className="wp-block-frames-vscode__status-item">
						<i className="fa-solid fa-code-branch"></i>
						<span>{ branch }</span>
					</div>
					<div className="wp-block-frames-vscode__status-item">
						<i className="fa-solid fa-circle-xmark"></i>
						<span>0</span>
						<i className="fa-solid fa-triangle-exclamation"></i>
						<span>0</span>
					</div>
				</div>
				<div className="wp-block-frames-vscode__status-right">
					<div className="wp-block-frames-vscode__status-item">
						<span>Ln 1, Col 1</span>
					</div>
					<div className="wp-block-frames-vscode__status-item">
						<span>Spaces: 2</span>
					</div>
					<div className="wp-block-frames-vscode__status-item">
						<span>UTF-8</span>
					</div>
					<div className="wp-block-frames-vscode__status-item">
						<span>LF</span>
					</div>
					<div className="wp-block-frames-vscode__status-item">
						<span>{ language }</span>
					</div>
				</div>
			</div>
		</div>
	);
}
