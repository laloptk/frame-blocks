import SafariUI from '../../organisms/browser/SafariUI';
import ChromeUI from '../../organisms/browser/ChromeUI';

export default function BrowserFrameTemplate( {
	browserVariant,
	url,
	tabTitle,
	renderViewport,
} ) {
	return (
		<>
			{ browserVariant === 'safari' ? (
				<SafariUI url={ url } tabTitle={ tabTitle } />
			) : (
				<ChromeUI url={ url } tabTitle={ tabTitle } />
			) }
			<div className={ `wp-block-frames-${ browserVariant }__viewport` }>
				{ renderViewport() }
			</div>
		</>
	);
}
