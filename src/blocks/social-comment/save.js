import { useBlockProps } from '@wordpress/block-editor';
import { SocialCommentTemplate } from '@wpfb/components';

export default function save( { attributes } ) {
	const {
		platform,
		theme,
		authorName,
		commentText,
		timeText,
		likesText,
		replyText,
		reactionCount,
		avatarUrl,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-social-comment wp-block-frames-social-comment--${ platform } wp-block-frames-social-comment--${ theme }`,
	} );

	return (
		<div { ...blockProps }>
			<SocialCommentTemplate
				authorName={ authorName }
				commentText={ commentText }
				timeText={ timeText }
				likesText={ likesText }
				replyText={ replyText }
				reactionCount={ reactionCount }
				platform={ platform }
				avatarUrl={ avatarUrl }
			/>
		</div>
	);
}
