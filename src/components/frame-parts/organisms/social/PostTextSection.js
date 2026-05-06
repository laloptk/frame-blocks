import SegmentedText from '../../atoms/social/SegmentedText';
import FrameIcon from '../../organisms/FrameIcon';

export default function PostTextSection( {
	isInstagram,
	username,
	isVerified,
	postText,
	postSegments,
	textPlaceholder,
} ) {
	const network = isInstagram ? 'ig' : 'fb';
	const rootClass = `wp-block-frames-${ network }`;
	const hasText = postSegments ? postSegments.length > 0 : Boolean( postText );
	const textPrefix = `${ rootClass }__text-`;

	if ( ! hasText && ! textPlaceholder ) {
		return null;
	}

	return (
		<div className={ [ 'wp-block-frames-social__text-area', `${ rootClass }__text` ].join( ' ' ) }>
			{ isInstagram && (
				<>
					<span className="wp-block-frames-ig__text-user">{ username }</span>
					{ isVerified && (
						<FrameIcon
							as="span"
							iconClass="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
							iconProps={ { 'aria-hidden': 'true' } }
						/>
					) }{ ' ' }
				</>
			) }
			{ hasText ? (
				<div className={ `${ rootClass }__text-content` }>
					<SegmentedText
						text={ postText }
						segments={ postSegments }
						classPrefix={ textPrefix }
					/>
				</div>
			) : (
				textPlaceholder && (
					<span className="wp-block-frames-social__text-placeholder">
						{ textPlaceholder }
					</span>
				)
			) }
		</div>
	);
}
