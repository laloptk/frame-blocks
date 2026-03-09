import PostHeader from '../../organisms/social/PostHeader';
import PostTextSection from '../../organisms/social/PostTextSection';
import PostEngagement from '../../organisms/social/PostEngagement';
import PostActions from '../../organisms/social/PostActions';

export default function SocialPostTemplate( {
	isInstagram,
	username,
	pageSubtitle,
	avatarUrl,
	isVerified,
	postText,
	postSegments,
	likesCount,
	reactionsCount,
	commentsCount,
	isLiked,
	timestamp,
	verifiedLabel,
	textPlaceholder,
	actionLabels,
	renderMedia,
	renderComments,
} ) {
	return (
		<>
			<div className="wp-block-frames-social__section wp-block-frames-social__section--header">
				<PostHeader
					isInstagram={ isInstagram }
					username={ username }
					pageSubtitle={ pageSubtitle }
					avatarUrl={ avatarUrl }
					isVerified={ isVerified }
					verifiedLabel={ verifiedLabel }
				/>
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--text">
				<PostTextSection
					isInstagram={ isInstagram }
					username={ username }
					isVerified={ isVerified }
					postText={ postText }
					postSegments={ postSegments }
					textPlaceholder={ textPlaceholder }
				/>
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--media">
				{ renderMedia( isInstagram ) }
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--engagement">
				<PostEngagement
					isInstagram={ isInstagram }
					likesCount={ likesCount }
					reactionsCount={ reactionsCount }
					commentsCount={ commentsCount }
				/>
			</div>

			<div className="wp-block-frames-social__section wp-block-frames-social__section--primary-actions">
				<PostActions
					isInstagram={ isInstagram }
					isLiked={ isLiked }
					labels={ actionLabels }
				/>
			</div>

			{ isInstagram && (
				<div className="wp-block-frames-social__section wp-block-frames-social__section--timestamp">
					<div className="wp-block-frames-ig__timestamp">{ timestamp }</div>
				</div>
			) }

			<div className="wp-block-frames-social__section wp-block-frames-social__section--comments">
				<div className="wp-block-frames-social__comments">{ renderComments() }</div>
			</div>
		</>
	);
}
