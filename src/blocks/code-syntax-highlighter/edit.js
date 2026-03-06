import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';

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

const TERMINAL_LANGUAGES = [
	{ label: 'Bash / Shell', value: 'bash' },
	{ label: 'Shell', value: 'shellsession' },
	{ label: 'PowerShell', value: 'powershell' },
	{ label: 'Fish', value: 'fish' },
	{ label: 'Git Commit Message', value: 'git-commit' },
	{ label: 'Git Rebase Message', value: 'git-rebase' },
	{ label: 'SQL', value: 'sql' }
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
	const { terminalLang, theme, tokens, bg, code, codeLang, isTerminal, terminalPrompt, terminalCommand } = attributes;
	const toTokenize = isTerminal ? `${terminalPrompt} ${terminalCommand}` : code;
	const activeLanguage = isTerminal ? terminalLang : codeLang;
	const [ tokensData, loading, error ] = useTokens( toTokenize, activeLanguage, theme );

	useEffect( () => {
		if ( ! tokensData ) return;
		setAttributes( {
			tokens: tokensData.tokens,
			bg: tokensData.bg ?? DEFAULT_BG,
		} );
	}, [ tokensData, setAttributes ] );

	const hasStoredTokens = tokens && tokens.length > 0;
	const hasLiveTokens =
		tokensData && tokensData.tokens && tokensData.tokens.length > 0;

	const showWarning = !! error && hasStoredTokens;
	const showError = !! error && ! hasStoredTokens;
	const showLoading = loading && ! hasLiveTokens && ! hasStoredTokens;
	const showEmpty =
		! loading && ! error && ! hasLiveTokens && ! hasStoredTokens;

	const renderTokensData = useMemo( () => {
		if ( hasLiveTokens ) return tokensData;
		if ( hasStoredTokens ) return { tokens };
		return null;
	}, [ hasLiveTokens, hasStoredTokens, tokensData, tokens ] );
	const blockProps = useBlockProps( {
		className: `wp-block-frames-code ${isTerminal ? 'is-terminal-code' : ''}`,
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
						value={ activeLanguage }
						options={ isTerminal ? TERMINAL_LANGUAGES : LANGUAGES }
						onChange={ ( value ) => {
								isTerminal 
									? setAttributes({ terminalLang: value })
									: setAttributes({ codeLang: value })
							}
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
					<ToggleControl
						label="Enable terminal syntax highlighting"
						help={isTerminal ? 'Enabled' : 'Disabled'}
						checked={isTerminal}
						onChange={(val) => setAttributes({ isTerminal: val })}
					/>
					{
						isTerminal &&
							<TextControl 
								label={ __('Terminal Prompt', 'wpframeblocks')}
								value={ terminalPrompt }
								onChange={ ( value ) =>
									setAttributes( { terminalPrompt: value } )
								}
							/>
					}
					<TextareaControl
						label={ isTerminal ? __( 'Command', 'wpframeblocks' ) : __( 'Code', 'wpframeblocks' ) }
						value={ isTerminal ? terminalCommand : code }
						rows={ 12 }
						onChange={ ( value ) =>
							isTerminal 
								? setAttributes( { terminalCommand: value } ) 
								: setAttributes( { code: value } )
						}
					/>
				</PanelBody>
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

					{ renderTokensData && 
						<CodeHighlighter tokensData={ renderTokensData } />
				    }
				</div>
			</div>
		</>
	);
}
