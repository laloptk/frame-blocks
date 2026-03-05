import { useState, useEffect, useRef } from '@wordpress/element';
import { tokenizeWithCachedHighlighter } from '@wpfb/services/shikiHighlighterStore';

/**
 * Debounced tokenization hook.
 *
 * - Debounces by 300 ms to avoid tokenizing on every keystroke.
 * - Cancellation-safe: ignores stale async results after unmount or re-trigger.
 * - On error: retains the previous valid tokens rather than clearing the preview.
 *
 * @param {string} code
 * @param {string} language
 * @param {string} theme
 * @returns {[object|null, boolean, Error|null]} [tokensData, loading, error]
 */
export default function useTokens( code, language, theme ) {
	const [ tokensData, setTokensData ] = useState( null );
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( null );

	// Persist the last successful result so we can keep the preview on error.
	const prevTokensRef = useRef( null );
	// Lets the cleanup function signal that the async effect is stale.
	const cancelRef = useRef( false );

	useEffect( () => {
		if ( ! code ) {
			setLoading( false );
			return;
		}

		setLoading( true );
		cancelRef.current = false;

		const timer = setTimeout( async () => {
			try {
				const result = await tokenizeWithCachedHighlighter(
					code,
					language,
					theme
				);

				if ( cancelRef.current ) return;

				prevTokensRef.current = result;
				setTokensData( result );
				setError( null );
			} catch ( err ) {
				if ( cancelRef.current ) return;

				setError( err );
				// Keep showing the last valid preview — do not clear tokensData.
				if ( prevTokensRef.current ) {
					setTokensData( prevTokensRef.current );
				}
			} finally {
				if ( ! cancelRef.current ) {
					setLoading( false );
				}
			}
		}, 300 );

		return () => {
			cancelRef.current = true;
			clearTimeout( timer );
		};
	}, [ code, language, theme ] );

	return [ tokensData, loading, error ];
}
