import FrameIcon from '../FrameIcon';

export default function CodeEditorStatusBar( { branch, language } ) {
	return (
		<div className="wp-block-frames-vscode__statusbar">
			<div className="wp-block-frames-vscode__status-left">
				<div className="wp-block-frames-vscode__status-item">
					<FrameIcon iconClass="fa-solid fa-code-branch" />
					<span>{ branch }</span>
				</div>
				<div className="wp-block-frames-vscode__status-item">
					<FrameIcon iconClass="fa-solid fa-circle-xmark" />
					<span>0</span>
					<FrameIcon iconClass="fa-solid fa-triangle-exclamation" />
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
	);
}
