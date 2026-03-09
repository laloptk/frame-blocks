# WP Frame Blocks

`wp-frame-blocks` is a WordPress plugin that provides Gutenberg blocks for rendering UI frame mockups (browser, code editor, device, social post/comment, and file tree elements).

## Requirements

- Node.js 18+
- npm
- A local WordPress installation (plugin path)

## Development

Install dependencies:

```bash
npm install
```

Start watch/build during development:

```bash
npm run start
```

Create production build:

```bash
npm run build
```

Lint/format:

```bash
npm run lint:js
npm run lint:css
npm run format
```

Create distributable zip:

```bash
npm run plugin-zip
```

## Project Structure

- `src/blocks/` block implementations (`block.json`, `index.js`, `edit.js`, `save.js`, styles)
- `src/components/` shared generic components (`StyleControls`, `AppendBlockButton`, code highlighter)
- `src/components/frame-parts/` reusable frame UI parts (atoms/organisms/templates)
- `src/helpers/` shared helper utilities
- `src/hooks/` shared hooks
- `src/services/` API/services (tokenization, etc.)
- `src/styles/` global editor/frontend style entry
- `build/` compiled block assets

## Aliases

Configured in `webpack.config.js` and `jsconfig.json`:

- `@wpfb/components` -> `src/components`
- `@wpfb/frame-components` -> `src/components/frame-parts`
- `@wpfb/helpers` -> `src/helpers`
- `@wpfb/hooks` -> `src/hooks`
- `@wpfb/services` -> `src/services`

Use `@wpfb/frame-components` for frame-part UI composition, and `@wpfb/components` for generic shared components.

## Blocks

Current block set under `src/blocks/`:

- `browser-frame`
- `code-editor-frame`
- `code-syntax-highlighter`
- `device-frame`
- `file-tree`
- `file-tree-item`
- `social-post`
- `social-comment`

## Build Behavior

Webpack auto-discovers block entries from `src/blocks/*/index.js` when `block.json` exists.  
`npm run build` also generates `build/blocks-manifest.php` via `wp-scripts build-blocks-manifest`.

