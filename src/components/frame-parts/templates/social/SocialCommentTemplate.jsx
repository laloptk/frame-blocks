import SegmentedText from '../../atoms/social/SegmentedText';
import FrameIcon from '../../organisms/FrameIcon';

export default function SocialCommentTemplate( {
	authorName,
	commentText,
	timeText,
	likesText,
	replyText,
	reactionCount,
	platform,
	avatarUrl,
} ) {
	const avatarLetter = authorName ? authorName.charAt( 0 ).toUpperCase() : '?';

	return (
		<div className="wp-block-frames-social-comment__row">
			<div
				className="wp-block-frames-social-comment__avatar"
				style={ avatarUrl ? { backgroundImage: `url(${ avatarUrl })` } : undefined }
			>
				{ ! avatarUrl && avatarLetter }
			</div>
			<div className="wp-block-frames-social-comment__content">
				<div className="wp-block-frames-social-comment__message">
					<span className="wp-block-frames-social-comment__author">{ authorName }</span>{ ' ' }
					<div className="wp-block-frames-social-comment__text">
						<SegmentedText
							text={ commentText }
							classPrefix="wp-block-frames-social-comment__text-"
						/>
					</div>
				</div>
				<div className="wp-block-frames-social-comment__meta">
					<span>{ timeText }</span>
					<span>{ likesText }</span>
					<span>{ replyText }</span>
					{ platform === 'facebook' && (
						<span className="wp-block-frames-social-comment__reaction-count">
							<FrameIcon iconClass="fa-solid fa-thumbs-up" /> { reactionCount }
						</span>
					) }
				</div>
			</div>
		</div>
	);
}
