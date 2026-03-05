/**
 * Renders a single tokenized line of code.
 *
 * Each token carries color and optional font-style flags (italic / bold /
 * underline) encoded as a bitmask matching Shiki's FontStyle enum:
 *   1 = italic | 2 = bold | 4 = underline
 *
 * The blinking cursor is appended only on the last line to mimic an active
 * editor caret.
 *
 * @param {object}  props
 * @param {number}  props.lineNumber  1-based line index.
 * @param {Array}   props.tokens      Shiki token objects for this line.
 * @param {boolean} props.isLastLine  When true, renders the cursor span.
 */
export default function CodeEditorLine( { lineNumber, tokens, isLastLine } ) {
	return (
		<div className="wp-block-frames-code__line">
			<span
				className="wp-block-frames-code__line-num"
				aria-hidden="true"
			>
				{ lineNumber }
			</span>
			<span className="wp-block-frames-code__line-tokens">
				{ tokens.map( ( token, idx ) => {
					const style = {};

					if ( token.color ) {
						style.color = token.color;
					}

					// Shiki FontStyle bitmask
					const fontStyle = token.fontStyle ?? 0;
					if ( fontStyle & 1 ) style.fontStyle = 'italic';
					if ( fontStyle & 2 ) style.fontWeight = 'bold';
					if ( fontStyle & 4 ) style.textDecoration = 'underline';

					return (
						<span key={ idx } style={ style }>
							{ token.content }
						</span>
					);
				} ) }
				{ isLastLine && (
					<span
						className="wp-block-frames-code__cursor"
						aria-hidden="true"
					/>
				) }
			</span>
		</div>
	);
}
