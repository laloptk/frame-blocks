import PostHeader from '../../molecules/social/PostHeader';
import PostTextSection from '../../molecules/social/PostTextSection';
import PostEngagement from '../../molecules/social/PostEngagement';
import PostActions from '../../molecules/social/PostActions';

export default function SocialPostTemplate( {
	isInstagram,
	username,
	pageName,
	pageSubtitle,
	avatarUrl,
	isVerified,
	caption,
	postText,
	captionSegments,
	postSegments,
	likesCount,
	reactionsCount,
	commentsCount,
	isLiked,
	timestamp,
	verifiedLabel,
	instagramCaptionPlaceholder,
	facebookPostPlaceholder,
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
					pageName={ pageName }
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
					caption={ caption }
					postText={ postText }
					captionSegments={ captionSegments }
					postSegments={ postSegments }
					instagramCaptionPlaceholder={ instagramCaptionPlaceholder }
					facebookPostPlaceholder={ facebookPostPlaceholder }
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
