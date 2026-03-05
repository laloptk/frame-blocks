# Gutenberg Blocks Prompt Template (Reverse-Engineered)

This file is built by reverse engineering the current `levelupwp/code-window` implementation and walking backwards from the finished block to a prompt that can generate it in one pass (or very close).

## 1) Reverse-Engineered One-Pass Prompt (Current `code-window`)

```text
You are a senior WordPress Gutenberg engineer working in a block theme.

Build a static Gutenberg block named `wpframeblocks/code-syntax-heighlighter` that renders stylized syntax-highlighted code.

Use this architecture exactly:
- `blocks/code-syntax-highlighter/block.json`
- `blocks/code-syntax-highlighter/index.js`
- `blocks/code-syntax-highlighter/edit.js`
- `blocks/code-syntax-highlighter/save.js`
- `blocks/code-syntax-highlighter/style.scss`
- `blocks/code-syntax-highlighter/editor.scss`
- `src/components/CodeHighlighter.js`
- `src/components/CodeEditorLine.js`
- `src/components/hooks/useTokens.js`
- `src/services/shikiHighlighterStore.js`

Functional requirements:
1) Attributes
- `language` string default `php`
- `theme` string default `github-dark`
- `tokens` array default `[]`
- `bg` string default `#0F172A`
- `code` string default sample PHP snippet

2) Editor controls
- Inspector controls for:
  - language select
  - theme select
  - code textarea

3) Tokenization and performance
- Use Shiki web bundle.
- Implement a Redux-like module store (plain JS reducer + state + dispatch) in `src/services/shikiHighlighterStore.js`.
- Store must cache:
  - `highlighterPromise`
  - `loadedLanguages`
  - `loadedThemes`
  - `pendingLoads` keyed by `language::theme`
- Expose `tokenizeWithCachedHighlighter(code, language, theme)`.
- Resolve invalid language/theme to defaults.
- Create singleton highlighter with `getSingletonHighlighter`.
- Ensure requested language/theme are loaded before `highlighter.codeToTokens`.
- Deduplicate concurrent language/theme loads via `pendingLoads`.
- If singleton initialization fails, clear cached promise and allow retry.
- If direct highlighter path fails, fallback to Shiki bundle `codeToTokens` shortcut.

4) Hook behavior (`useTokens`)
- Debounce tokenization by 300ms.
- Maintain `tokensData`, `loading`, `error`.
- Cancellation-safe async effect.
- Return `[tokensData, loading, error]`.
- On error: keep previous valid tokens (do not clear preview state).

5) Editor preview behavior
- Show highlighted code when tokens exist.
- On initial loading (no tokens yet), show "Highlighting code...".
- If tokens already exist and refresh fails, show warning text above code: "Could not refresh highlighting. Showing last valid preview." and keep old preview.
- If no tokens and error, show "Could not highlight code. Check language/theme options.".
- If no code/tokens and no loading/error, show "Add code to preview highlighted output.".
- Persist fresh tokens and bg into block attributes when tokenization succeeds.

6) Rendering
- `CodeHighlighter` renders `<pre><code>` with per-line `CodeEditorLine`.
- `CodeEditorLine` renders line number, token spans with color and font style metadata, and cursor on last line.
- `save.js` should render same window frame structure and only render highlighted output when `tokens.length` exists.

7) Styling
- Use existing class names and BEM-like structure under `.luwp-code-window`.
- Keep line number column, token styles via `data-font`, scroll styling, and warning/status styles.
- Reuse theme presets/tokens (`--wp--preset--*`) where possible.

8) Quality constraints
- Keep implementation modular and readable.
- No destructive git operations.
- Avoid introducing new runtime dependencies.
- Match existing code conventions used in the theme.

Deliverables:
- Full code for all touched files.
- Brief rationale for architecture and caching decisions.
- Manual test checklist for:
  - single block
  - multiple code-window blocks in same post
  - switching language/theme
  - invalid language/theme fallback
  - frontend parity
```

## 2) Why This Prompt Works (Extracted Concepts)

These are the core concepts that made the prompt effective:

1. Pin the exact file map.
- Forces clean separation of block wiring, rendering, hook logic, and caching logic.

2. Specify runtime behavior, not only structure.
- Loading/error/refresh UX details prevent ambiguous implementations.

3. Define cache scope explicitly.
- "Global module store" avoids per-instance hook caches when multiple blocks are present.

4. Define fallback paths.
- Invalid lang/theme and Shiki failure behavior are part of correctness, not optional extras.

5. Include concurrency requirements.
- `pendingLoads` dedupe avoids duplicate `loadLanguage/loadTheme` work across instances.

6. Demand parity between editor and save output.
- Prevents visual drift and broken frontend rendering.

7. Make acceptance tests part of the prompt.
- Greatly improves one-pass success rate.

## 3) Reusable Template (For Other Gutenberg Blocks)

```text
You are a senior WordPress Gutenberg engineer working in a block theme.

Build block: {{namespace/block-name}}
Goal: {{functional outcome}}

Project constraints:
- Use `@wordpress/scripts` tooling.
- Reuse theme tokens/presets and existing SCSS structure.
- Keep implementation clean, extensible, and scalable.

Required file map:
- `blocks/{{slug}}/block.json`
- `blocks/{{slug}}/index.js`
- `blocks/{{slug}}/edit.js`
- `blocks/{{slug}}/save.js` (or `render.php` if dynamic)
- `blocks/{{slug}}/style.scss`
- `blocks/{{slug}}/editor.scss`
- `src/components/{{BlockName}}/*` or reusable shared components
- `src/components/hooks/{{hookName}}.js` (if async/derived editor data is needed)
- `src/services/{{serviceName}}.js` (if cross-instance caching/shared runtime state is needed)

Implementation requirements:
1) Attributes
- Define strict schema with correct defaults.
- Persist only what frontend needs.

2) Editor UX
- Provide clear Inspector controls.
- Real-time preview.
- Explicit first-load, empty, and error states.
- Avoid layout jump in status UI.

3) Async/derived data handling
- Debounce expensive work.
- Cancellation-safe effects.
- Preserve last good preview during transient errors when possible.

4) Performance and scaling
- If many block instances can exist on one page, use shared module-level cache/state.
- If shared state is used, include:
  - cache keys
  - pending-request dedupe
  - fallback/retry behavior

5) Output and accessibility
- Semantic markup in editor and frontend.
- Keep editor/save parity.

6) Styling
- Follow existing naming conventions.
- Use design tokens and existing partial organization.
- No ad hoc magic values unless justified.

7) Quality gates
- ESLint/Stylelint pass for touched files.
- No editor console errors in normal path.
- Add a short manual QA checklist.

Deliverables:
- Complete file contents for all new/updated files.
- Short rationale for architecture tradeoffs.
- Extension points for future features.
- Manual QA checklist.
```

## 4) Optional Add-On: Reverse Engineering Workflow Prompt

Use this when you already have a working block and want to derive a strong generation prompt from it:

```text
Reverse engineer this Gutenberg block by working backwards:
1) Identify final behavior and UX states from the current implementation.
2) Identify architecture boundaries (block wiring, components, hooks, services, styles).
3) Identify performance strategies (cache scope, dedupe, fallback).
4) Draft the one-pass implementation prompt that would recreate this block very closely.
5) Extract reusable prompt principles.
6) Produce a generalized template prompt for other blocks.
Return results in Markdown with sections for:
- One-pass prompt
- Extracted principles
- Reusable template
- QA checklist
```
