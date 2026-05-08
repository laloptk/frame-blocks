import FrameIcon from '../../organisms/FrameIcon';

export default function PostHeader( {
	isInstagram,
	username,
	pageSubtitle,
	avatarUrl,
	isVerified,
	verifiedLabel = 'Verified',
} ) {
	const network = isInstagram ? 'ig' : 'fb';
	const rootClass = `wp-block-frames-${ network }`;
	const avatarLetter = username ? username.charAt( 0 ).toUpperCase() : '?';
	const verifiedClass = `fa-solid fa-circle-check ${ rootClass }__verified`;
	const avatarBgImg = avatarUrl ? { backgroundImage: `url(${ avatarUrl })` } : undefined;
	const displayAvatar = ! avatarUrl && avatarLetter;

	const avatar = isInstagram ? (
		<div className={ `${ rootClass }__avatar-ring` }>
			<div className={ `${ rootClass }__avatar-inner` }>
				<div
					className={ `${ rootClass }__avatar-img` }
					style={ avatarBgImg }
				>
					{ displayAvatar }
				</div>
			</div>
		</div>
	) : (
		<div
			className={ `${ rootClass }__avatar` }
			style={ avatarBgImg }
		>
			{ displayAvatar }
		</div>
	);

	return (
		<div className={ `${ rootClass }__header` }>
			<div className={ `${ rootClass }__user-row` }>
				{ avatar }
				<div className={ `${ rootClass }__user-info` }>
					<div className={ `${ rootClass }__user-name-row` }>
						<span className={ `${ rootClass }__user-name` }>
							{ username }
						</span>
						{ isVerified && (
							<FrameIcon
								iconClass={ verifiedClass }
								iconProps={ { 'aria-label': verifiedLabel } }
							/>
						) }
					</div>
					{ ! isInstagram && (
						<span className={ `${ rootClass }__subtitle` }>{ pageSubtitle }</span>
					) }
				</div>
			</div>
			<div className={ `${ rootClass }__more-btn` } aria-hidden="true">
				<FrameIcon iconClass="fa-solid fa-ellipsis" />
			</div>
		</div>
	);
}
