import { useBlockProps } from '@wordpress/block-editor';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const {
		variant,
		username,
		likesCount,
		caption,
		timestamp,
		imageUrl,
		imageAlt,
		avatarUrl,
		maxWidth,
		isVerified,
		isLiked,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-ig wp-block-frames-ig--${ variant }`,
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const captionSegments = parseCaptionSegments( caption );

	return (
		<div { ...blockProps }>
			{ /* ── Header ── */ }
			<div className="wp-block-frames-ig__header">
				<div className="wp-block-frames-ig__user-row">
					<div className="wp-block-frames-ig__avatar-ring">
						<div className="wp-block-frames-ig__avatar-inner">
							<div
								className="wp-block-frames-ig__avatar-img"
								style={
									avatarUrl
										? { backgroundImage: `url(${avatarUrl})` }
										: undefined
								}
							>
								{ ! avatarUrl && (
									<i className="fa-solid fa-user"></i>
								) }
							</div>
						</div>
					</div>
					<div className="wp-block-frames-ig__user-info">
						<div className="wp-block-frames-ig__username-row">
							<span className="wp-block-frames-ig__username">
								{ username }
							</span>
							{ isVerified && (
								<i
									className="fa-solid fa-circle-check wp-block-frames-ig__verified"
									aria-label="Verified"
								></i>
							) }
						</div>
					</div>
				</div>
				<div
					className="wp-block-frames-ig__more-btn"
					aria-hidden="true"
				>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>

			{ /* ── Post image ── */ }
			<div className="wp-block-frames-ig__image">
				{ imageUrl ? (
					<img src={ imageUrl } alt={ imageAlt } />
				) : (
					<i
						className="fa-regular fa-image"
						aria-hidden="true"
					></i>
				) }
			</div>

			{ /* ── Actions ── */ }
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

			{ /* ── Likes ── */ }
			<div className="wp-block-frames-ig__likes">{ likesCount }</div>

			{ /* ── Caption ── */ }
			{ ( username || captionSegments.length > 0 ) && (
				<div className="wp-block-frames-ig__caption">
					<span className="wp-block-frames-ig__cap-user">
						{ username }
					</span>
					{ isVerified && (
						<i
							className="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
							aria-hidden="true"
						></i>
					) }{ ' ' }
					{ captionSegments.length > 0 && (
						<span className="wp-block-frames-ig__cap-text">
							{ captionSegments.map( ( seg, i ) => {
								if ( seg.type === 'plain' ) return seg.text;
								return (
									<span
										key={ i }
										className={ `wp-block-frames-ig__cap-${ seg.type }` }
									>
										{ seg.text }
									</span>
								);
							} ) }
						</span>
					) }
				</div>
			) }

			{ /* ── Timestamp ── */ }
			<div className="wp-block-frames-ig__timestamp">{ timestamp }</div>
		</div>
	);
}
