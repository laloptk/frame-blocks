import { useBlockProps } from '@wordpress/block-editor';
import { parseCaptionSegments } from '@wpfb/helpers';

function SegmentedText( { text } ) {
	const segments = parseCaptionSegments( text );
	if ( ! segments.length ) return null;
	const lines = [ [] ];

	segments.forEach( ( seg ) => {
		if ( seg.type === 'linebreak' ) {
			lines.push( [] );
			return;
		}
		lines[ lines.length - 1 ].push( seg );
	} );

	return (
		<>
			{ lines.map( ( line, lineIndex ) => {
				return (
					<p key={ lineIndex } className="wp-block-frames-social-comment__text-line">
						{ line.map( ( seg, segIndex ) => {
							const key = `${ lineIndex }-${ segIndex }`;
							if ( seg.type === 'plain' ) return seg.text;
							if ( seg.type === 'url' ) {
								const href = seg.text.startsWith( 'www.' )
									? `https://${ seg.text }`
									: seg.text;
								return (
									<a
										key={ key }
										className="wp-block-frames-social-comment__text-url"
										href={ href }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ seg.text }
									</a>
								);
							}
							return (
								<span
									key={ key }
									className={ `wp-block-frames-social-comment__text-${ seg.type }` }
								>
									{ seg.text }
								</span>
							);
						} ) }
					</p>
				);
			} ) }
		</>
	);
}

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

	const avatarLetter = authorName ? authorName.charAt( 0 ).toUpperCase() : '?';

	return (
		<div { ...blockProps }>
			<div className="wp-block-frames-social-comment__row">
				<div
					className="wp-block-frames-social-comment__avatar"
					style={
						avatarUrl
							? { backgroundImage: `url(${ avatarUrl })` }
							: undefined
					}
				>
					{ ! avatarUrl && avatarLetter }
				</div>
				<div className="wp-block-frames-social-comment__content">
					<div className="wp-block-frames-social-comment__message">
						<span className="wp-block-frames-social-comment__author">{ authorName }</span>{ ' ' }
						<div className="wp-block-frames-social-comment__text">
							<SegmentedText text={ commentText } />
						</div>
					</div>
					<div className="wp-block-frames-social-comment__meta">
						<span>{ timeText }</span>
						<span>{ likesText }</span>
						<span>{ replyText }</span>
						{ platform === 'facebook' && (
							<span className="wp-block-frames-social-comment__reaction-count">
								<i className="fa-solid fa-thumbs-up"></i> { reactionCount }
							</span>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
