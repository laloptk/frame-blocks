import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import { getFileIcon, parseBreadcrumb } from '@wpfb/helpers';

import './editor.scss';

const TEMPLATE = [
	[ 'wpframeblocks/file-tree', {} ],
	[
		'wpframeblocks/code-syntax-highlighter',
		{ className: 'wp-block-frames-vscode__code-zone' },
	],
	[
		'wpframeblocks/code-syntax-highlighter',
		{ className: 'wp-block-frames-vscode__terminal-zone' },
	],
];

const TEMPLATE_LOCK = 'all';

const MENU_ITEMS = [ 'File', 'Edit', 'Selection', 'View', 'Go', 'Run' ];

export default function Edit( { attributes, setAttributes } ) {
	const { projectName, fileName, filePath, language, branch } = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-frames-vscode',
		role: 'img',
		'aria-label': `VS Code editor — ${ projectName }`,
	} );

	const { iconClass, colorClass } = getFileIcon( fileName );
	const crumbs = parseBreadcrumb( filePath, fileName );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Editor Settings', 'wpframeblocks' ) }>
					<TextControl
						label={ __( 'Project Name', 'wpframeblocks' ) }
						value={ projectName }
						onChange={ ( value ) =>
							setAttributes( { projectName: value } )
						}
					/>
					<TextControl
						label={ __( 'File Name', 'wpframeblocks' ) }
						value={ fileName }
						placeholder="index.ts"
						onChange={ ( value ) =>
							setAttributes( { fileName: value } )
						}
					/>
					<TextControl
						label={ __( 'File Path', 'wpframeblocks' ) }
						value={ filePath }
						placeholder="src/components"
						help={ __(
							'Slash-separated path shown in the breadcrumb, e.g. src/components',
							'wpframeblocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { filePath: value } )
						}
					/>
					<TextControl
						label={ __( 'Language', 'wpframeblocks' ) }
						value={ language }
						placeholder="TypeScript JSX"
						onChange={ ( value ) =>
							setAttributes( { language: value } )
						}
					/>
					<TextControl
						label={ __( 'Branch', 'wpframeblocks' ) }
						value={ branch }
						placeholder="main"
						onChange={ ( value ) =>
							setAttributes( { branch: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

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

					{ /*
					 * Inner zones — 2-column × 5-row CSS grid.
					 * Column 1: sidebar (core/list file explorer, LEFT).
					 * Column 2: tabs | breadcrumb | code | panel-head | terminal.
					 * The three InnerBlocks (core/list, code-zone, terminal-zone)
					 * are positioned into their grid areas via CSS class selectors.
					 */ }
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

						{ /* Panel header — grid-area: panel-head (above terminal zone) */ }
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

						{ /* InnerBlocks:
						   - core/list           → .wp-block-list            → grid-area: sidebar (LEFT)
						   - code-syntax-highlighter #1 → .__code-zone       → grid-area: code
						   - code-syntax-highlighter #2 → .__terminal-zone   → grid-area: terminal
						*/ }
						<InnerBlocks
							template={ TEMPLATE }
							templateLock={ TEMPLATE_LOCK }
						/>
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
		</>
	);
}
