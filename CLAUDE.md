# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run build       # Production build + blocks manifest
npm run start       # Development watch mode
npm run lint:js     # Lint JavaScript
npm run lint:css    # Lint SCSS/CSS
npm run format      # Auto-format code
npm run plugin-zip  # Package plugin for distribution
```

After `build`, the `build/blocks-manifest.php` is auto-generated — do not edit it manually.

## Architecture

**WP Frame Blocks** is a WordPress Gutenberg plugin providing UI frame blocks — decorative wrappers and templated social/app frames for content.

### Plugin entry point

`wp-frame-blocks.php` registers all blocks via `wp_register_block_types_from_metadata_collection()` pointing to `build/blocks` and `build/blocks-manifest.php`. No per-block PHP registration needed.

### Block structure

Each block lives in `src/blocks/[block-name]/` with:
- `block.json` — metadata, attributes, asset references
- `index.js` — registers the block (`registerBlockType`)
- `edit.js` — Gutenberg editor component
- `save.js` — static frontend serialization (not dynamic/`render.php`)
- `style.scss` — frontend + editor shared styles
- `editor.scss` — editor-only styles

Webpack auto-discovers blocks: any directory under `src/blocks/` with a `block.json` and `index.js` is built automatically as `build/blocks/[block-name]/index.js`.

### Shared source directories

- `src/components/` — shared React components, aliased as `@wpfb/components`
- `src/hooks/` — shared custom hooks, aliased as `@wpfb/hooks`
- `src/helpers/` — shared utilities, aliased as `@wpfb/helpers`
- `includes/` — PHP classes (Composer-autoloaded, namespace `wpframeblocks`) — planned, not yet scaffolded

Import aliases are configured in `webpack.config.js` (`resolve.alias`) and `jsconfig.json` (for editor IntelliSense). Each directory exports from its `index.js`.

## Block Taxonomy

**Decorative Frame Blocks** (InnerBlocks wrappers, purely structural):
- `device-frame` — phone/tablet/laptop device shells
- `browser-frame` — Safari / Chrome browser chrome
- `code-editor-frame` — VS Code editor shell

**Application Frame Blocks** (planned, templated with editable attributes):
- LinkedIn Job Post, Facebook Post, Instagram Post
- WhatsApp/Telegram Conversation
- Code Syntax Highlighter, Terminal Syntax Highlighter

## Design System & CSS Rules

The authoritative design reference is `ai-context/design/_frames-ref.md`. Follow it strictly.

**Naming conventions:**
- BEM prefix: `wp-block-frames-[ctx]` (e.g., `wp-block-frames-chrome`, `wp-block-frames-vscode`)
- Context codes: `laptop tablet phone safari chrome vscode ig fb li wa tg`
- Elements: `wp-block-frames-[ctx]__[el]`
- Modifiers: `wp-block-frames-[ctx]--[mod]` or `wp-block-frames-[ctx]__[el]--[mod]`
- FORBIDDEN: nested BEM elements (`__el__el`), hardcoded hex values, `transform:scale()`

**CSS tokens:** All values must use `var(--frames-[ctx]-[property])`. Global tokens (spacing, radius, shadow, z-index, icon sizes) are defined in `_frames-ref.md`. Never hardcode hex, px, or arbitrary values.

**Scaling:** Use `container-type:size` on the block root only. Size all child elements with `clamp(floor, (native_px / REF_W) * 100cqw, native_px)`. Reference widths per context: `browser=860 vscode=900 ig=614 fb=680 li=660 wa/tg=375 phone=280`.

**Icons:** Font Awesome 6.5 CDN (free tier) only — no inline SVGs.

**Supplementary tokens:** When a needed value isn't in the design system, define it in the block's own `:root` block and mark with `/* (*) */`.

## HTML Mockups (Source of Truth for UI)

Pre-built HTML mockups live in `ai-context/design/`. These use BEM and WordPress-like markup and are the reference for implementing block UI:
- `frame-chrome.html` — Chrome (BEM-ready: `wp-block-frames-chrome`)
- `frame-vscode-scalable.html` — VS Code fluid frame (BEM-ready: `wp-block-frames-vscode`)
- `frame-linkedin-job.html` — LinkedIn job post (BEM-ready: `wp-block-frames-linkedin`)
- `frame-safari.html`, `frame-instagram-post.html`, `frame-facebook-post.html`, `frame-devices.html` — not yet BEM-refactored
- `frame-vscode.html` — DEPRECATED (uses `transform:scale`), use `frame-vscode-scalable.html`

## Adding a New Block

1. Create `src/blocks/[block-name]/` with `block.json`, `index.js`, `edit.js`, `save.js`, `style.scss`, `editor.scss`.
2. `block.json` name must follow `wpframeblocks/[block-name]`.
3. Run `npm run build` — the block is auto-discovered.
4. No PHP changes needed for registration.

## WordPress Requirements

- Requires WordPress 6.8+, PHP 7.4+
- All blocks use API version 3, static `save.js` serialization
- Text domain: `wpframeblocks`
