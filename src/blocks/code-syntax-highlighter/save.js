import { useBlockProps } from '@wordpress/block-editor';

import CodeHighlighter from '@wpfb/components/CodeHighlighter';

/**
 * Serialize the block to static HTML.
 *
 * Shiki tokenization happens in the editor (edit.js) and is persisted into
 * the `tokens` attribute. The save function renders those pre-computed tokens
 * to inline-colored spans — no JS or Shiki needed on the frontend.
 */
export default function save( { attributes } ) {
	const { tokens, bg, isTerminal } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-frames-code ${ isTerminal ? 'is-terminal-code' : '' }`,
		style: { '--frames-code-bg': bg },
	} );

	return (
		<div { ...blockProps }>
			<div className="wp-block-frames-code__body">
				{ tokens && tokens.length > 0 && (
					<CodeHighlighter tokensData={ { tokens } } />
				) }
			</div>
		</div>
	);
}
