# FrameBlocks

A WordPress Gutenberg plugin that provides UI frame blocks — decorative mockup wrappers for browser windows, code editors, mobile/tablet/laptop devices, social media posts, and file trees.

Built for content creators and developers who want to show UI mockups, code snippets, and app screenshots inside WordPress posts and pages without leaving the editor.

---

## Blocks

| Block | Description |
|---|---|
| `frameblocks/browser-frame` | Safari or Chrome browser shell wrapping any inner content |
| `frameblocks/code-editor-frame` | VS Code editor shell with sidebar, code zone, and terminal |
| `frameblocks/code-syntax-highlighter` | Syntax-highlighted code block powered by [Shiki](https://shiki.style/) |
| `frameblocks/device-frame` | Phone, tablet, or laptop device shell |
| `frameblocks/file-tree` | VS Code-style file/folder tree |
| `frameblocks/file-tree-item` | Individual file or folder row inside a file tree |
| `frameblocks/social-post` | Instagram or Facebook post mockup |
| `frameblocks/social-comment` | Comment row nested inside a social post |

---

## Requirements

- **WordPress** 6.8+
- **PHP** 7.4+
- **Node.js** 18+ and **npm** (for development builds)

---

## Installation

### From a release zip

1. Download the latest zip from [Releases](../../releases).
2. In WordPress admin go to **Plugins → Add New → Upload Plugin**.
3. Upload the zip and activate.

### From source

```bash
git clone https://github.com/your-username/frame-blocks.git
cd frame-blocks
npm install
npm run build
```

Then symlink or copy the directory into your WordPress `wp-content/plugins/` folder and activate the plugin.

---

## Development

```bash
npm install       # Install dependencies
npm run start     # Watch mode — rebuilds on file changes
npm run build     # Production build
npm run lint:js   # Lint JavaScript
npm run lint:css  # Lint SCSS/CSS
npm run format    # Auto-format source files
npm run plugin-zip # Package a distributable zip
```

The build output lands in `build/`. Webpack auto-discovers blocks: any directory under `src/blocks/` with a `block.json` and `index.js` is built automatically. Running `npm run build` also regenerates `build/blocks-manifest.php` — do not edit that file manually.

---

## Project Structure

```
src/
├── blocks/              # One directory per block
│   └── [block-name]/
│       ├── block.json   # Block metadata and attribute schema
│       ├── index.js     # Block registration
│       ├── edit.js      # Editor component
│       ├── save.js      # Frontend serialization
│       ├── style.scss   # Frontend + editor shared styles
│       └── editor.scss  # Editor-only styles
├── components/          # Shared React components (@wpfb/components)
│   ├── frame-parts/     # Frame UI templates (@wpfb/frame-components)
│   └── style-controls/  # Inspector panel controls (spacing, border, etc.)
├── helpers/             # Utility functions (@wpfb/helpers)
├── hooks/               # Custom React hooks (@wpfb/hooks)
├── services/            # Singleton services — Shiki highlighter store
└── styles/              # Global design-token stylesheet
```

### Import aliases

Configured in `webpack.config.js` and `jsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@wpfb/components` | `src/components` |
| `@wpfb/frame-components` | `src/components/frame-parts` |
| `@wpfb/helpers` | `src/helpers` |
| `@wpfb/hooks` | `src/hooks` |
| `@wpfb/services` | `src/services` |

---

## Design System

All visual tokens use `var(--frames-*)` CSS custom properties. Block-specific tokens are declared in each block's `style.scss`. Global tokens are in `src/styles/global.scss` and are loaded on every page via the plugin's `enqueue_block_assets` hook.

Refer to `src/blocks/[block-name]/style.scss` for the token reference of each block.

---

## License

[GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html)
