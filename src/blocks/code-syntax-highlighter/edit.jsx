import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

import { CodeHighlighter, SpacingPanel, BorderPanel, ResponsiveControls } from '@wpfb/components';
import { useTokens } from '@wpfb/hooks';
import { buildResponsiveStyles, useDeviceType } from '@wpfb/helpers';

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
	{ label: 'None', value: 'none'},
	{ label: 'GitHub Dark', value: 'github-dark' },
	{ label: 'GitHub Light', value: 'github-light' },
	{ label: 'Dracula', value: 'dracula' },
	{ label: 'One Dark Pro', value: 'one-dark-pro' },
	{ label: 'Nord', value: 'nord' },
	{ label: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
	{ label: 'Solarized Dark', value: 'solarized-dark' },
	{ label: 'Solarized Light', value: 'solarized-light' },
	{ label: 'VS Code Dark+', value: 'dark-plus' },
	{ label: 'Min Light', value: 'min-light' },
	{ label: 'Night Owl', value: 'night-owl' },
	{ label: 'Red', value: 'red'}
];

export default function Edit({ attributes, setAttributes }) {
	const {
		terminalLang,
		theme,
		tokens,
		bg,
		code,
		codeLang,
		isTerminal,
		terminalPrompt,
		terminalCommand,
		spacing,
		border,
	} = attributes;

	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const deviceType = useDeviceType();

	const toTokenize = isTerminal ? `${terminalPrompt} ${terminalCommand}` : code;
	const activeLanguage = isTerminal ? terminalLang : codeLang;
	const [tokensData, loading, error] = useTokens(toTokenize, activeLanguage, theme);

	useEffect(() => {
		if (!tokensData) return;
		setAttributes({
			tokens: tokensData.tokens,
			bg: tokensData.bg ?? DEFAULT_BG,
		});
	}, [tokensData, setAttributes]);

	const hasStoredTokens = tokens && tokens.length > 0;
	const hasLiveTokens =
		tokensData && tokensData.tokens && tokensData.tokens.length > 0;

	const showWarning = !!error && hasStoredTokens;
	const showError = !!error && !hasStoredTokens;
	const showLoading = loading && !hasLiveTokens && !hasStoredTokens;
	const showEmpty =
		!loading && !error && !hasLiveTokens && !hasStoredTokens;

	const renderTokensData = useMemo(() => {
		if (hasLiveTokens) return tokensData;
		if (hasStoredTokens) return { tokens };
		return null;
	}, [hasLiveTokens, hasStoredTokens, tokensData, tokens]);

	const blockProps = useBlockProps({
		className: `wp-block-frames-code ${isTerminal ? 'is-terminal-code' : ''}`,
		style: {
			'--frames-code-bg': bg,
			...buildResponsiveStyles(attributes, deviceType),
		},
	});

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={ __( 'Spacing', 'frame-blocks' ) }
					view={ spacingView }
					handleView={ setSpacingView }
				>
					<SpacingPanel
						group={ spacing }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ spacingView }
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={ __( 'Border', 'frame-blocks' ) }
					view={ borderView }
					handleView={ setBorderView }
				>
					<BorderPanel
						group={ border }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ borderView }
					/>
				</ResponsiveControls>
				<PanelBody
					title={__('Syntax Highlighter', 'frame-blocks')}
				>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Language', 'frame-blocks')}
						value={activeLanguage}
						options={isTerminal ? TERMINAL_LANGUAGES : LANGUAGES}
						onChange={(value) => {
							isTerminal
								? setAttributes({ terminalLang: value })
								: setAttributes({ codeLang: value })
						}
						}
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Theme', 'frame-blocks')}
						value={theme}
						options={THEMES}
						onChange={(value) =>
							setAttributes({ theme: value })
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label="Enable terminal syntax highlighting"
						help={isTerminal ? 'Enabled' : 'Disabled'}
						checked={isTerminal}
						onChange={(val) => setAttributes({ isTerminal: val })}
					/>
					{
						isTerminal &&
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Terminal Prompt', 'frame-blocks')}
							value={terminalPrompt}
							onChange={(value) =>
								setAttributes({ terminalPrompt: value })
							}
						/>
					}
					<TextareaControl
						__nextHasNoMarginBottom
						label={isTerminal ? __('Command', 'frame-blocks') : __('Code', 'frame-blocks')}
						value={isTerminal ? terminalCommand : code}
						rows={12}
						onChange={(value) =>
							isTerminal
								? setAttributes({ terminalCommand: value })
								: setAttributes({ code: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="wp-block-frames-code__body">
					{showWarning && (
						<p className="wp-block-frames-code__warning">
							{__(
								'Could not refresh highlighting. Showing last valid preview.',
								'frame-blocks'
							)}
						</p>
					)}

					{showLoading && (
						<p className="wp-block-frames-code__status">
							{__('Highlighting code…', 'frame-blocks')}
						</p>
					)}

					{showError && (
						<p className="wp-block-frames-code__status wp-block-frames-code__status--error">
							{__(
								'Could not highlight code. Check language/theme options.',
								'frame-blocks'
							)}
						</p>
					)}

					{showEmpty && (
						<p className="wp-block-frames-code__status">
							{__(
								'Add code to preview highlighted output.',
								'frame-blocks'
							)}
						</p>
					)}

					{renderTokensData &&
						<CodeHighlighter tokensData={renderTokensData} />
					}
				</div>
			</div>
		</>
	);
}
