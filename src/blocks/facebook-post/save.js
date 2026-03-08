import { useBlockProps } from '@wordpress/block-editor';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const {
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

	const blockProps = useBlockProps.save( {
		className: 'wp-block-frames-fb',
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const avatarLetter = pageName ? pageName.charAt( 0 ).toUpperCase() : '?';
	const postSegments = parseCaptionSegments( postText );

	return (
		<div { ...blockProps }>
			{ /* ── Header ── */ }
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
							<span className="wp-block-frames-fb__name">
								{ pageName }
							</span>
							{ isVerified && (
								<i
									className="fa-solid fa-circle-check wp-block-frames-fb__verified"
									aria-label="Verified"
								></i>
							) }
						</div>
						<span className="wp-block-frames-fb__subtitle">
							{ pageSubtitle }
						</span>
					</div>
				</div>
				<div
					className="wp-block-frames-fb__more-btn"
					aria-hidden="true"
				>
					<i className="fa-solid fa-ellipsis"></i>
				</div>
			</div>

			{ /* ── Post text ── */ }
			{ postSegments.length > 0 && (
				<div className="wp-block-frames-fb__body">
					{ postSegments.map( ( seg, i ) => {
						if ( seg.type === 'plain' ) return seg.text;
						return (
							<span
								key={ i }
								className={ `wp-block-frames-fb__text-${ seg.type }` }
							>
								{ seg.text }
							</span>
						);
					} ) }
				</div>
			) }

			{ /* ── Post image ── */ }
			<div className="wp-block-frames-fb__image">
				{ imageUrl ? (
					<img src={ imageUrl } alt={ imageAlt } />
				) : (
					<i
						className="fa-regular fa-image"
						aria-hidden="true"
					></i>
				) }
			</div>

			{ /* ── Reactions row ── */ }
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
							🤗
						</div>
					</div>
					<span className="wp-block-frames-fb__reactions-text">
						{ reactionsCount }
					</span>
				</div>
				<span className="wp-block-frames-fb__comments-count">
					{ commentsCount }
				</span>
			</div>

			{ /* ── Actions ── */ }
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
		</div>
	);
}
