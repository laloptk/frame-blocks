export default function DeviceFrameTemplate( { renderScreen } ) {
	return (
		<div className="wpf-device-frame__shell">
			<div className="wpf-device-frame__screen">{ renderScreen() }</div>
		</div>
	);
}
