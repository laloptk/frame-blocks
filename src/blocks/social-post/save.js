import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { SocialPostTemplate, FrameIcon } from '@wpfb/components';
import { buildInlineStyle } from '@wpfb/helpers';

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
		: `wp-block-frames-social wp-block-frames-fb wp-block-frames-fb--${ variant }`;

	const blockProps = useBlockProps.save( {
		className: blockClassName,
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<SocialPostTemplate
				isInstagram={ isInstagram }
				username={ username }
				pageName={ pageName }
				pageSubtitle={ pageSubtitle }
				avatarUrl={ avatarUrl }
				isVerified={ isVerified }
				caption={ caption }
				postText={ postText }
				likesCount={ likesCount }
				reactionsCount={ reactionsCount }
				commentsCount={ commentsCount }
				isLiked={ isLiked }
				timestamp={ timestamp }
				renderMedia={ ( instagramMode ) => (
					<div className={ instagramMode ? 'wp-block-frames-ig__image' : 'wp-block-frames-fb__image' }>
						{ imageUrl ? (
							<img src={ imageUrl } alt={ imageAlt } />
						) : (
							<FrameIcon
								iconClass="fa-regular fa-image"
								iconProps={ { 'aria-hidden': 'true' } }
							/>
						) }
					</div>
				) }
				renderComments={ () => <InnerBlocks.Content /> }
			/>
		</div>
	);
}
