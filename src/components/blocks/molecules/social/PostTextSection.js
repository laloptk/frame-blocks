import SegmentedText from '../../atoms/social/SegmentedText';
import FrameIcon from '../../organisms/FrameIcon';

export default function PostTextSection( {
	isInstagram,
	username,
	isVerified,
	caption,
	captionSegments,
	postText,
	postSegments,
	instagramCaptionPlaceholder,
	facebookPostPlaceholder,
} ) {
	if ( isInstagram ) {
		const hasCaption = captionSegments
			? captionSegments.length > 0
			: Boolean( caption );

		return (
			<div className="wp-block-frames-social__text-area wp-block-frames-ig__caption">
				<span className="wp-block-frames-ig__cap-user">{ username }</span>
				{ isVerified && (
					<FrameIcon
						iconClass="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
						iconProps={ { 'aria-hidden': 'true' } }
					/>
				) }{ ' ' }
				{ hasCaption ? (
					<div className="wp-block-frames-ig__cap-text">
						<SegmentedText
							text={ caption }
							segments={ captionSegments }
							classPrefix="wp-block-frames-ig__cap-"
						/>
					</div>
				) : (
					instagramCaptionPlaceholder && (
						<span className="wp-block-frames-social__cap-placeholder">
							{ instagramCaptionPlaceholder }
						</span>
					)
				) }
			</div>
		);
	}

	const hasPostText = postSegments ? postSegments.length > 0 : Boolean( postText );

	if ( hasPostText ) {
		return (
			<div className="wp-block-frames-social__text-area wp-block-frames-fb__body">
				<SegmentedText
					text={ postText }
					segments={ postSegments }
					classPrefix="wp-block-frames-fb__text-"
				/>
			</div>
		);
	}

	if ( ! facebookPostPlaceholder ) {
		return null;
	}

	return (
		<div className="wp-block-frames-social__text-area wp-block-frames-fb__body wp-block-frames-social__body-placeholder">
			{ facebookPostPlaceholder }
		</div>
	);
}
