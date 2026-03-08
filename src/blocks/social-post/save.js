import { useBlockProps } from '@wordpress/block-editor';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';

function SegmentedText( { segments, classPrefix } ) {
	if ( ! segments.length ) return null;

	return (
		<>
			{ segments.map( ( seg, i ) => {
				if ( seg.type === 'plain' ) return seg.text;
				return (
					<span key={ i } className={ `${ classPrefix }${ seg.type }` }>
						{ seg.text }
					</span>
				);
			} ) }
		</>
	);
}

function SocialTextSection( {
	isInstagram,
	username,
	isVerified,
	captionSegments,
	postSegments,
} ) {
	if ( isInstagram ) {
		return (
			<div className="wp-block-frames-social__text-area wp-block-frames-ig__caption">
				<span className="wp-block-frames-ig__cap-user">{ username }</span>
				{ isVerified && (
					<i
						className="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
						aria-hidden="true"
					></i>
				) }{ ' ' }
				<SegmentedText segments={ captionSegments } classPrefix="wp-block-frames-ig__cap-" />
			</div>
		);
	}

	return postSegments.length > 0 ? (
		<div className="wp-block-frames-social__text-area wp-block-frames-fb__body">
			<SegmentedText segments={ postSegments } classPrefix="wp-block-frames-fb__text-" />
		</div>
	) : null;
}

export default function save( { attributes } ) {
	const {
		platform,
		variant,
		username,
		likesCount,
		caption,
		timestamp,
		pageName,
		pageSubtitle,
		postText,
		reactionsCount,
		commentsCount,
		imageUrl,
		imageAlt,
		avatarUrl,
		isVerified,
		isLiked,
		maxWidth,
	} = attributes;

	const isInstagram = platform === 'instagram';
	const blockClassName = isInstagram
		? `wp-block-frames-social wp-block-frames-ig wp-block-frames-ig--${ variant }`
		: 'wp-block-frames-social wp-block-frames-fb';

	const blockProps = useBlockProps.save( {
		className: blockClassName,
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const avatarLetter = pageName ? pageName.charAt( 0 ).toUpperCase() : '?';
	const captionSegments = parseCaptionSegments( caption );
	const postSegments = parseCaptionSegments( postText );

	return (
		<div { ...blockProps }>
			<div className="wp-block-frames-social__section wp-block-frames-social__section--header">
				{ isInstagram ? (
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
										{ ! avatarUrl && <i className="fa-solid fa-user"></i> }
									</div>
								</div>
							</div>
							<div className="wp-block-frames-ig__user-info">
								<div className="wp-block-frames-ig__username-row">
									<span className="wp-block-frames-ig__username">{ username }</span>
									{ isVerified && (
										<i
											className="fa-solid fa-circle-check wp-block-frames-ig__verified"
											aria-label="Verified"
										></i>
									) }
								</div>
							</div>
						</div>
						<div className="wp-block-frames-ig__more-btn" aria-hidden="true">
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
				) : (
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
										<i
											className="fa-solid fa-circle-check wp-block-frames-fb__verified"
											aria-label="Verified"
										></i>
									) }
								</div>
								<span className="wp-block-frames-fb__subtitle">{ pageSubtitle }</span>
							</div>
						</div>
						<div className="wp-block-frames-fb__more-btn" aria-hidden="true">
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
				) }
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--text">
				<SocialTextSection
					isInstagram={ isInstagram }
					username={ username }
					isVerified={ isVerified }
					captionSegments={ captionSegments }
					postSegments={ postSegments }
				/>
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--media">
				<div className={ isInstagram ? 'wp-block-frames-ig__image' : 'wp-block-frames-fb__image' }>
					{ imageUrl ? (
						<img src={ imageUrl } alt={ imageAlt } />
					) : (
						<i className="fa-regular fa-image" aria-hidden="true"></i>
					) }
				</div>
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--engagement">
				{ isInstagram ? (
					<div className="wp-block-frames-ig__likes">{ likesCount }</div>
				) : (
					<div className="wp-block-frames-fb__reactions-row" aria-hidden="true">
						<div className="wp-block-frames-fb__reactions-left">
							<div className="wp-block-frames-fb__reaction-icons">
								<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--like">
									<i className="fa-solid fa-thumbs-up"></i>
								</div>
								<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--love">
									<i className="fa-solid fa-heart"></i>
								</div>
								<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--care">
									<span aria-hidden="true">&#129303;</span>
								</div>
							</div>
							<span className="wp-block-frames-fb__reactions-text">{ reactionsCount }</span>
						</div>
						<span className="wp-block-frames-fb__comments-count">{ commentsCount }</span>
					</div>
				) }
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--primary-actions">
				{ isInstagram ? (
					<div className="wp-block-frames-ig__actions" aria-hidden="true">
						<div className="wp-block-frames-ig__actions-left">
							<span className="wp-block-frames-ig__action-btn">
								<i
									className={
										isLiked
											? 'fa-solid fa-heart wp-block-frames-ig__heart--liked'
											: 'fa-regular fa-heart'
									}
								></i>
							</span>
							<span className="wp-block-frames-ig__action-btn">
								<i className="fa-regular fa-comment"></i>
							</span>
							<span className="wp-block-frames-ig__action-btn">
								<i className="fa-regular fa-paper-plane"></i>
							</span>
						</div>
						<span className="wp-block-frames-ig__bookmark">
							<i className="fa-regular fa-bookmark"></i>
						</span>
					</div>
				) : (
					<div className="wp-block-frames-fb__actions" aria-hidden="true">
						<span className="wp-block-frames-fb__action-btn">
							<i
								className={
									isLiked
										? 'fa-solid fa-thumbs-up wp-block-frames-fb__thumb--liked'
										: 'fa-regular fa-thumbs-up'
								}
							></i>
							<span>Like</span>
						</span>
						<span className="wp-block-frames-fb__action-btn">
							<i className="fa-regular fa-comment"></i>
							<span>Comment</span>
						</span>
						<span className="wp-block-frames-fb__action-btn">
							<i className="fa-solid fa-share-nodes"></i>
							<span>Share</span>
						</span>
					</div>
				) }
			</div>

			{ isInstagram && (
				<div className="wp-block-frames-social__section wp-block-frames-social__section--timestamp">
					<div className="wp-block-frames-ig__timestamp">{ timestamp }</div>
				</div>
			) }
		</div>
	);
}
