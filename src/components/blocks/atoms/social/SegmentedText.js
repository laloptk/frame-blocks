import { parseCaptionSegments } from '@wpfb/helpers';

export default function SegmentedText( { text = '', segments, classPrefix } ) {
	const resolvedSegments = segments || parseCaptionSegments( text );
	if ( ! resolvedSegments.length ) return null;

	const lines = [ [] ];
	resolvedSegments.forEach( ( segment ) => {
		if ( segment.type === 'linebreak' ) {
			lines.push( [] );
			return;
		}
		lines[ lines.length - 1 ].push( segment );
	} );

	return (
		<>
			{ lines.map( ( line, lineIndex ) => (
				<p key={ lineIndex } className={ `${ classPrefix }line` }>
					{ line.map( ( segment, segmentIndex ) => {
						const key = `${ lineIndex }-${ segmentIndex }`;
						if ( segment.type === 'plain' ) return segment.text;

						if ( segment.type === 'url' ) {
							const href = segment.text.startsWith( 'www.' )
								? `https://${ segment.text }`
								: segment.text;
							return (
								<a
									key={ key }
									className={ `${ classPrefix }url` }
									href={ href }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ segment.text }
								</a>
							);
						}

						return (
							<span key={ key } className={ `${ classPrefix }${ segment.type }` }>
								{ segment.text }
							</span>
						);
					} ) }
				</p>
			) ) }
		</>
	);
}
