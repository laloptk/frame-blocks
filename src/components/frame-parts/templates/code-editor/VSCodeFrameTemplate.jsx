import CodeEditorTitleBar from '../../organisms/code-editor/CodeEditorTitleBar';
import CodeEditorBody from '../../organisms/code-editor/CodeEditorBody';
import CodeEditorStatusBar from '../../organisms/code-editor/CodeEditorStatusBar';

export default function VSCodeFrameTemplate( {
	projectName,
	fileName,
	filePath,
	language,
	branch,
	renderInnerZones,
} ) {
	return (
		<>
			<CodeEditorTitleBar projectName={ projectName } />
			<CodeEditorBody
				fileName={ fileName }
				filePath={ filePath }
				renderInnerZones={ renderInnerZones }
			/>
			<CodeEditorStatusBar branch={ branch } language={ language } />
		</>
	);
}
