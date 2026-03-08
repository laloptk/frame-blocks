/**
 * Parse a plain-text Instagram caption and split it into segments, tagging
 * each run as 'plain', 'hashtag' (#word), or 'mention' (@word).
 *
 * Hashtag rules (mirrors Instagram):
 *   - Starts with #, followed by one or more word chars or accented/Cyrillic letters.
 *   - A hashtag made entirely of digits is NOT a hashtag (e.g. #123 is skipped).
 *
 * Mention rules:
 *   - Starts with @, followed by word chars and dots (Instagram handle pattern).
 *
 * @param {string} text  Plain-text caption string.
 * @returns {Array<{text: string, type: 'plain'|'hashtag'|'mention'}>}
 */
export function parseCaptionSegments( text ) {
	if ( ! text ) return [];

	const segments = [];

	// Capture #hashtags and @mentions; support Latin, accented, and Cyrillic chars.
	const TOKEN = /(#[\w\u00C0-\u024F\u0400-\u04FF]+|@[\w.]+)/gu;

	let lastIndex = 0;
	let match;

	while ( ( match = TOKEN.exec( text ) ) !== null ) {
		// Flush any plain text before this token.
		if ( match.index > lastIndex ) {
			segments.push( {
				text: text.slice( lastIndex, match.index ),
				type: 'plain',
			} );
		}

		const token = match[ 0 ];
		const isHashtag = token[ 0 ] === '#';

		// Skip #123-style numeric-only hashtags — Instagram ignores these.
		if ( isHashtag && /^#\d+$/.test( token ) ) {
			segments.push( { text: token, type: 'plain' } );
		} else {
			segments.push( {
				text: token,
				type: isHashtag ? 'hashtag' : 'mention',
			} );
		}

		lastIndex = TOKEN.lastIndex;
	}

	// Flush remaining plain text.
	if ( lastIndex < text.length ) {
		segments.push( { text: text.slice( lastIndex ), type: 'plain' } );
	}

	return segments;
}
