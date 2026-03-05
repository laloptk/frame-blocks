import CodeEditorLine from './CodeEditorLine';

/**
 * Renders a full tokenized code listing as a `<pre><code>` block.
 *
 * Accepts the `tokensData` shape returned by Shiki's `codeToTokens`:
 *   { tokens: LineToken[][], bg?, fg?, ... }
 *
 * Also accepts a minimal `{ tokens }` shape when re-rendering from persisted
 * block attributes (no bg/fg needed — colors are inlined per-token).
 *
 * @param {object} props
 * @param {{ tokens: Array<Array<object>> }} props.tokensData
 */
export default function CodeHighlighter( { tokensData } ) {
	const { tokens } = tokensData;

	return (
		<pre className="wp-block-frames-code__pre">
			<code className="wp-block-frames-code__code">
				{ tokens.map( ( lineTokens, lineIdx ) => (
					<CodeEditorLine
						key={ lineIdx }
						lineNumber={ lineIdx + 1 }
						tokens={ lineTokens }
						isLastLine={ lineIdx === tokens.length - 1 }
					/>
				) ) }
			</code>
		</pre>
	);
}
