export default function DeviceFrameTemplate( { deviceType, renderScreen } ) {
	const renderStatusBar = () => (
		<div className="wp-block-frames-device__statusbar" aria-hidden="true">
			<div className="wp-block-frames-device__statusbar-left">9:41</div>
			<div className="wp-block-frames-device__statusbar-right">
				<i className="fa-solid fa-signal" />
				<i className="fa-solid fa-wifi" />
				<i className="fa-solid fa-battery-three-quarters" />
			</div>
		</div>
	);

	if ( deviceType === 'laptop' ) {
		return (
			<>
				<div className="wp-block-frames-device__lid">
					<div className="wp-block-frames-device__bezel">
						<div className="wp-block-frames-device__notch" aria-hidden="true" />
						<div className="wp-block-frames-device__screen">{ renderScreen() }</div>
					</div>
				</div>
				<div className="wp-block-frames-device__hinge" aria-hidden="true" />
				<div className="wp-block-frames-device__base" aria-hidden="true" />
			</>
		);
	}

	if ( deviceType === 'tablet' ) {
		return (
			<>
				<div className="wp-block-frames-device__shell">
					<div className="wp-block-frames-device__notch" aria-hidden="true" />
					<div className="wp-block-frames-device__screen">
						{ renderStatusBar() }
						<div className="wp-block-frames-device__screen-content">
							{ renderScreen() }
						</div>
					</div>
					<div className="wp-block-frames-device__home-indicator" aria-hidden="true" />
				</div>
				<div
					className="wp-block-frames-device__btn wp-block-frames-device__btn--power"
					aria-hidden="true"
				/>
				<div
					className="wp-block-frames-device__btn wp-block-frames-device__btn--vol-up"
					aria-hidden="true"
				/>
				<div
					className="wp-block-frames-device__btn wp-block-frames-device__btn--vol-down"
					aria-hidden="true"
				/>
			</>
		);
	}

	return (
		<>
			<div className="wp-block-frames-device__shell">
				<div className="wp-block-frames-device__notch" aria-hidden="true" />
				<div className="wp-block-frames-device__screen">
					{ renderStatusBar() }
					<div className="wp-block-frames-device__screen-content">
						{ renderScreen() }
					</div>
				</div>
				<div className="wp-block-frames-device__home-indicator" aria-hidden="true" />
			</div>
			<div
				className="wp-block-frames-device__btn wp-block-frames-device__btn--silent"
				aria-hidden="true"
			/>
			<div
				className="wp-block-frames-device__btn wp-block-frames-device__btn--vol-up"
				aria-hidden="true"
			/>
			<div
				className="wp-block-frames-device__btn wp-block-frames-device__btn--vol-down"
				aria-hidden="true"
			/>
			<div
				className="wp-block-frames-device__btn wp-block-frames-device__btn--power"
				aria-hidden="true"
			/>
		</>
	);
}
