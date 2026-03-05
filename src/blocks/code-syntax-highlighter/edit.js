import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import CodeHighlighter from '@wpfb/components/CodeHighlighter';
import useTokens from '@wpfb/components/hooks/useTokens';

import './editor.scss';

const DEFAULT_BG = '#0F172A';

const LANGUAGES = [
	{ label: 'PHP', value: 'php' },
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'TypeScript', value: 'typescript' },
	{ label: 'CSS', value: 'css' },
	{ label: 'HTML', value: 'html' },
	{ label: 'JSON', value: 'json' },
	{ label: 'Bash / Shell', value: 'bash' },
	{ label: 'Python', value: 'python' },
	{ label: 'Rust', value: 'rust' },
	{ label: 'Go', value: 'go' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'YAML', value: 'yaml' },
	{ label: 'Markdown', value: 'markdown' },
];

const THEMES = [
	{ label: 'GitHub Dark', value: 'github-dark' },
	{ label: 'GitHub Light', value: 'github-light' },
	{ label: 'Dracula', value: 'dracula' },
	{ label: 'One Dark Pro', value: 'one-dark-pro' },
	{ label: 'Nord', value: 'nord' },
	{ label: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
	{ label: 'Solarized Dark', value: 'solarized-dark' },
	{ label: 'VS Code Dark+', value: 'dark-plus' },
	{ label: 'Min Light', value: 'min-light' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { language, theme, tokens, bg, code } = attributes;

	const [ tokensData, loading, error ] = useTokens( code, language, theme );

	// Persist fresh tokens and bg into block attributes when tokenization succeeds.
	// setAttributes is stable; tokensData only changes when new results arrive.
	useEffect( () => {
		if ( ! tokensData ) return;
		setAttributes( {
			tokens: tokensData.tokens,
			bg: tokensData.bg ?? DEFAULT_BG,
		} );
	}, [ tokensData, setAttributes ] );

	// Flags describing the current state.
	const hasStoredTokens = tokens && tokens.length > 0;
	const hasLiveTokens =
		tokensData && tokensData.tokens && tokensData.tokens.length > 0;

	const showWarning = !! error && hasStoredTokens;
	const showError = !! error && ! hasStoredTokens;
	const showLoading = loading && ! hasLiveTokens && ! hasStoredTokens;
	const showEmpty =
		! loading && ! error && ! hasLiveTokens && ! hasStoredTokens;

	// Prefer live results; fall back to stored tokens when live are unavailable.
	const renderTokensData = hasLiveTokens
		? tokensData
		: hasStoredTokens
		? { tokens }
		: null;

	const blockProps = useBlockProps( {
		className: 'wp-block-frames-code',
		style: { '--frames-code-bg': bg },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Syntax Highlighter', 'wpframeblocks' ) }
				>
					<SelectControl
						label={ __( 'Language', 'wpframeblocks' ) }
						value={ language }
						options={ LANGUAGES }
						onChange={ ( value ) =>
							setAttributes( { language: value } )
						}
					/>
					<SelectControl
						label={ __( 'Theme', 'wpframeblocks' ) }
						value={ theme }
						options={ THEMES }
						onChange={ ( value ) =>
							setAttributes( { theme: value } )
						}
					/>
					<TextareaControl
						label={ __( 'Code', 'wpframeblocks' ) }
						value={ code }
						rows={ 12 }
						onChange={ ( value ) =>
							setAttributes( { code: value } )
						}
					/>
				</PanelBody>
				{/* TODO: Create controls to choose between normal code and terminal higlighted*/}
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wp-block-frames-code__body">
					{ showWarning && (
						<p className="wp-block-frames-code__warning">
							{ __(
								'Could not refresh highlighting. Showing last valid preview.',
								'wpframeblocks'
							) }
						</p>
					) }

					{ showLoading && (
						<p className="wp-block-frames-code__status">
							{ __( 'Highlighting code\u2026', 'wpframeblocks' ) }
						</p>
					) }

					{ showError && (
						<p className="wp-block-frames-code__status wp-block-frames-code__status--error">
							{ __(
								'Could not highlight code. Check language/theme options.',
								'wpframeblocks'
							) }
						</p>
					) }

					{ showEmpty && (
						<p className="wp-block-frames-code__status">
							{ __(
								'Add code to preview highlighted output.',
								'wpframeblocks'
							) }
						</p>
					) }

					{ renderTokensData && (
						<CodeHighlighter tokensData={ renderTokensData } />
					) }
				</div>
			</div>
		</>
	);
}
