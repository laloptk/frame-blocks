import FrameIcon from '../../organisms/FrameIcon';

export default function PostHeader( {
	isInstagram,
	username,
	pageName,
	pageSubtitle,
	avatarUrl,
	isVerified,
	verifiedLabel = 'Verified',
	avatarFallbackIconClassName = 'fa-solid fa-user',
} ) {
	const avatarLetter = pageName ? pageName.charAt( 0 ).toUpperCase() : '?';

	if ( isInstagram ) {
		return (
			<div className="wp-block-frames-ig__header">
				<div className="wp-block-frames-ig__user-row">
					<div className="wp-block-frames-ig__avatar-ring">
						<div className="wp-block-frames-ig__avatar-inner">
							<div
								className="wp-block-frames-ig__avatar-img"
								style={
									avatarUrl
										? { backgroundImage: `url(${ avatarUrl })` }
										: undefined
								}
							>
								{ ! avatarUrl && <FrameIcon iconClass={ avatarFallbackIconClassName } /> }
							</div>
						</div>
					</div>
					<div className="wp-block-frames-ig__user-info">
						<div className="wp-block-frames-ig__username-row">
							<span className="wp-block-frames-ig__username">{ username }</span>
							{ isVerified && (
								<FrameIcon
									iconClass="fa-solid fa-circle-check wp-block-frames-ig__verified"
									iconProps={ { 'aria-label': verifiedLabel } }
								/>
							) }
						</div>
					</div>
				</div>
				<div className="wp-block-frames-ig__more-btn" aria-hidden="true">
					<FrameIcon iconClass="fa-solid fa-ellipsis" />
				</div>
			</div>
		);
	}

	return (
		<div className="wp-block-frames-fb__header">
			<div className="wp-block-frames-fb__user-row">
				<div
					className="wp-block-frames-fb__avatar"
					style={
						avatarUrl
							? { backgroundImage: `url(${ avatarUrl })` }
							: undefined
					}
				>
					{ ! avatarUrl && avatarLetter }
				</div>
				<div className="wp-block-frames-fb__meta">
					<div className="wp-block-frames-fb__name-row">
						<span className="wp-block-frames-fb__name">{ pageName }</span>
						{ isVerified && (
							<FrameIcon
								iconClass="fa-solid fa-circle-check wp-block-frames-fb__verified"
								iconProps={ { 'aria-label': verifiedLabel } }
							/>
						) }
					</div>
					<span className="wp-block-frames-fb__subtitle">{ pageSubtitle }</span>
				</div>
			</div>
			<div className="wp-block-frames-fb__more-btn" aria-hidden="true">
				<FrameIcon iconClass="fa-solid fa-ellipsis" />
			</div>
		</div>
	);
}
