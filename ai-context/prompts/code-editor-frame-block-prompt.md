# Prompt: Build `frameblocks/code-editor-frame` Block

```text
You are a senior WordPress Gutenberg engineer working in a Gutenberg block plugin.

Build block: frameblocks/code-editor-frame
Goal: 
  * A VS Code editor shell (Dark+ theme) that wraps a single
InnerBlocks zone — styled with a CSS-grid (4 rows by 4 columns) split that positions a `core/list`
block in the right sidebar column (spans 4 rows and one column), a `frameblocks/code-syntax-highlighter` block in the editor column (spans 3 rows and 3 columns), and a terminal strip which also has a `frameblocks/code-syntax-highlighter` — all inside a pixel-perfect, fluid-scaling VS Code
UI.

---

## Reference documents

| File | Purpose |
|------|---------|
| `ai-context/design/frame-vscode-scalable.html` | Authoritative HTML mockup — BEM classes, token usage, and element structure |
| `ai-context/design/_frames-ref.md` | Master design token definitions — all `--frames-*` CSS custom properties |
| `ai-context/system/system-design.md` | Plugin architecture, block catalog, and InnerBlocks locking rules |

Read all three before writing any code.

---

## Project constraints

- Tooling: `@wordpress/scripts` (webpack override in `webpack.config.js`).
- Import aliases: `@wpfb/components`, `@wpfb/hooks`, `@wpfb/helpers`, `@wpfb/services`.
- All CSS values via `var(--frames-vscode-*)` design tokens. No hardcoded hex or px.
- Supplementary tokens (values not in the master design system) go in the
  block's own `:root` and are marked `/* (*) */`.
- BEM prefix: `wp-block-frames-vscode`. No nested BEM elements (`__el__el`).
- Icons: Font Awesome 6.5 CDN only (`fa-solid`, `fa-regular`, `fa-brands`).
  No inline SVGs.
- Scaling: `container-type: size` on block root only. Size child elements with
  `clamp(floor, (native_px / 900) * 100cqw, native_px)`. REF_W = 900.
- Aspect ratio: 16/10. Block root: `width: min(96vw, calc(96vh * (16/10)));
  aspect-ratio: 16/10`.
- Fonts: `'Segoe UI', system-ui, sans-serif` for UI chrome;
  `'Fira Code', 'Source Code Pro', Consolas, monospace` for code/terminal areas.
- No `transform: scale()` anywhere.
- API version 3, static `save.js` (no `render.php`). Text domain: `frameblocks`.
- WordPress 6.8+.

---

## Required file map

All files listed below must be fully written. Replace the existing scaffolded
versions of the block files entirely.

```
src/blocks/code-editor-frame/block.json
src/blocks/code-editor-frame/index.js
src/blocks/code-editor-frame/edit.js
src/blocks/code-editor-frame/save.js
src/blocks/code-editor-frame/style.scss
src/blocks/code-editor-frame/editor.scss
```

---

## HTML mockup reference

Match the BEM class names, token usage, and structure from `ai-context/design/frame-vscode-scalable.html` exactly. Key elements:

```
.wp-block-frames-vscode                    ← block root (container-type:size)
  .__titlebar                              ← title bar row
    .__titlebar-left                       ← logo + menu items
      .__logo                              ← fa-brands fa-microsoft
      .__menubar > .__menu-item(s)         ← File Edit Selection View Go Run ···
    .__search                              ← search bar (decorative, shows projectName)
    .__win-controls > .__win-btn(×3)       ← Windows-style: minimize, maximize, close
  .__body                                  ← flex row, flex:1
    .__activity                            ← activity bar (static decorative icons)
      .__activity-top > .__activity-btn(s) ← copy, search, git, debug, extensions, display
      .__activity-bottom > .__activity-btn(s) ← user, gear
    .__inner-zones                         ← CSS-grid 4 cols × 4 rows (no separate sidebar/editor wrappers)
      .__tabs > .__tab.__tab--active       ← grid-area: tabs (row 1, cols 1–3)
      .__breadcrumb                        ← grid-area: crumb (row 2, cols 1–3)
      core/list block                      ← grid-area: sidebar (col 4 RIGHT, rows 1–4)
      code-syntax-highlighter #1           ← grid-area: code (row 3, cols 1–3) — main editor
      code-syntax-highlighter #2           ← grid-area: terminal (row 4, cols 1–3) — terminal strip
  .__statusbar                             ← status bar row
    .__status-left  > .__status-item(s)    ← branch, errors/warnings, notifications
    .__status-right > .__status-item(s)    ← Ln/Col, Spaces, UTF-8, LF, language
```

Note: Check `ai-context/design/_frames-ref.md` for the canonical token definitions before writing any CSS. Reuse existing tokens wherever possible and only introduce supplementary tokens (marked `/* (*) */`) when a value is genuinely absent from that file.

---

## Implementation requirements

### 1) Attributes

Define in `block.json`:

| Attribute     | Type   | Default                    | Purpose                                  |
|---------------|--------|----------------------------|------------------------------------------|
| `projectName` | string | `"my-project"`             | Shown in titlebar search bar             |
| `fileName`    | string | `"index.ts"`               | Active tab label + last breadcrumb crumb |
| `filePath`    | string | `"src/components"`         | Breadcrumb path (slash-separated)        |
| `language`    | string | `"TypeScript JSX"`         | Shown in statusbar right side            |
| `branch`      | string | `"main"`                   | Shown in statusbar left (git branch)     |

Persist only these five scalar attributes. No tokens/code stored at this level —
those live inside the inner `frameblocks/code-syntax-highlighter` block.

### 2) InnerBlocks — single zone with CSS-grid split

The block has ONE `<InnerBlocks>` (one `<InnerBlocks.Content />` in save). It is
rendered inside a `.wp-block-frames-vscode__inner-zones` wrapper that sits inside
`.wp-block-frames-vscode__body` alongside only the activity bar.
There are NO separate `.__sidebar` or `.__editor` wrapper divs — the grid areas
handle visual placement entirely.

**Template** (locked — no adding/removing/moving):
```js
const TEMPLATE = [
  [ 'core/list', {
      className: 'wp-block-frames-vscode__tree-list',
      placeholder: 'Add files and folders…',
  } ],
  [ 'frameblocks/code-syntax-highlighter', {
      className: 'wp-block-frames-vscode__code-zone',
  } ],
  [ 'frameblocks/code-syntax-highlighter', {
      className: 'wp-block-frames-vscode__terminal-zone',
  } ],
];
const TEMPLATE_LOCK = 'all';
```

**CSS-grid positioning** — `.wp-block-frames-vscode__inner-zones` is a
4-column × 4-row grid. Columns 1–3 form the editor+terminal area; column 4 is the
right-hand sidebar (file explorer). Rows: tabs | breadcrumb | main code | terminal.

```css
/* Sketch — adapt to exact clamp values from mockup */
.wp-block-frames-vscode__inner-zones {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr clamp(140px, 17.19cqw, 220px);
  grid-template-rows: auto auto 1fr auto;   /* tabs | crumb | code | terminal */
  grid-template-areas:
    "tabs     tabs     tabs     sidebar"
    "crumb    crumb    crumb    sidebar"
    "code     code     code     sidebar"
    "terminal terminal terminal sidebar";
  flex: 1;
  overflow: hidden;
  min-height: 0;
}
```

The static `.wp-block-frames-vscode__tabs` and `.wp-block-frames-vscode__breadcrumb`
elements are rendered as **direct children** of `.wp-block-frames-vscode__inner-zones`
(in edit.js and save.js) and assigned their grid areas:

```css
.wp-block-frames-vscode__tabs       { grid-area: tabs; }
.wp-block-frames-vscode__breadcrumb { grid-area: crumb; }
```

The `core/list` block spans the full `sidebar` area (right column, all 4 rows).
The two `code-syntax-highlighter` blocks are distinguished by the `className`
injected via the template (see above), which Gutenberg appends to each block's
root element:

```css
/* Sidebar (file explorer) — right column, all 4 rows */
.wp-block-frames-vscode__inner-zones > .wp-block-list {
  grid-area: sidebar;
  /* sidebar background, border-left, overflow-y: auto */
}

/* Main code editor — cols 1–3, row 3 */
.wp-block-frames-vscode__inner-zones > .wp-block-frames-vscode__code-zone {
  grid-area: code;
  overflow: auto;
}

/* Terminal strip — cols 1–3, row 4 */
.wp-block-frames-vscode__inner-zones > .wp-block-frames-vscode__terminal-zone {
  grid-area: terminal;
  overflow: hidden;
  border-top: 1px solid var(--frames-vscode-border);
}
```

The terminal strip height is controlled by the inner `code-syntax-highlighter`
block's natural content height (single-line command). Do **not** assign a fixed
`auto` row height — let the block's own content dictate the row size.

> This approach requires no experimental Gutenberg APIs and works identically
> in the block editor and on the frontend.

### 3) Sidebar list styling — file tree appearance

The `core/list` block inside the sidebar must look like a VS Code file explorer
tree, not a bullet list. Strip all default list styles and apply tree-item
styling via CSS targeting `.wp-block-frames-vscode__inner-zones > .wp-block-list`.

Users add BEM modifier classes directly on list items to signal type:
- `wp-block-frames-vscode__tree-item--folder` → folder icon (`fa-solid fa-folder`)
  + folder color (`var(--frames-vscode-icon-folder)`)
- `wp-block-frames-vscode__tree-item--folder-open` → open folder icon
- `wp-block-frames-vscode__tree-item--active` → highlighted active file
- `wp-block-frames-vscode__tree-item--depth-N` (N = 0–4) → indentation levels

Apply these CSS rules in `style.scss`:
```css
/* Strip list chrome */
.wp-block-frames-vscode__inner-zones > .wp-block-list,
.wp-block-frames-vscode__inner-zones > .wp-block-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Each <li> becomes a tree row */
.wp-block-frames-vscode__inner-zones > .wp-block-list li,
.wp-block-frames-vscode__inner-zones > .wp-block-list li > * {
  display: flex;
  align-items: center;
  height: clamp(16px, 1.72cqw, 22px);
  font-size: clamp(9px, 0.98cqw, 12.5px);
  color: var(--frames-vscode-text);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: clamp(12px, 1.56cqw, 20px); /* default depth-1 indent */
}
.wp-block-frames-vscode__inner-zones > .wp-block-list li:hover {
  background: var(--frames-vscode-explorer-hover);
}
/* Depth modifier classes on <li> elements */
.wp-block-frames-vscode__tree-item--depth-0 { padding-left: clamp(4px, 0.63cqw, 8px) !important; }
.wp-block-frames-vscode__tree-item--depth-1 { padding-left: clamp(12px, 1.56cqw, 20px) !important; }
.wp-block-frames-vscode__tree-item--depth-2 { padding-left: clamp(20px, 2.66cqw, 34px) !important; }
.wp-block-frames-vscode__tree-item--depth-3 { padding-left: clamp(28px, 3.75cqw, 48px) !important; }
.wp-block-frames-vscode__tree-item--depth-4 { padding-left: clamp(36px, 4.84cqw, 62px) !important; }
/* Active item */
.wp-block-frames-vscode__tree-item--active {
  background: var(--frames-vscode-explorer-active) !important;
  color: var(--frames-vscode-icon-active) !important;
}
/* Pseudo-element folder/file icons via ::before — use FA Unicode if needed,
   or instruct users to prepend a short text icon. Document this in the block
   description. */
```

Do NOT attempt to inject Font Awesome icons via CSS `content` for list items —
it is unreliable cross-browser without the FA font loaded on the frontend. Instead,
document in the block description that users can prepend `📁` / `📄` text, or note
that the `code-syntax-highlighter` inner block provides its own icon row.
This is a known v1 limitation.

### 4) Breadcrumb rendering

Parse `filePath` by splitting on `/`. Render each segment as a
`.wp-block-frames-vscode__crumb` with `.wp-block-frames-vscode__crumb-sep`
chevrons between them. The final segment is `fileName` with the
`--active` modifier.

Example: `filePath="src/components"`, `fileName="index.ts"` renders:
```
src › components › index.ts
```

Create a shared helper `parseBreadcrumb(filePath, fileName)` in `edit.js` and
reuse it in `save.js` (or export from `@wpfb/helpers` if a helpers/index.js
already exports utilities).

### 5) Tab rendering

Render a single active tab showing `fileName`. Prefix with a Font Awesome icon
chosen by file extension:
- `.ts` / `.tsx` → `fa-brands fa-js` (blue: `var(--frames-vscode-icon-ts)`)
- `.js` / `.jsx` → `fa-brands fa-js` (yellow: `var(--frames-vscode-icon-js)`)
- `.php`         → `fa-brands fa-php`
- `.css` / `.scss` → `fa-brands fa-css3-alt`
- `.html`        → `fa-brands fa-html5`
- any other      → `fa-regular fa-file-code` (dim color)

Implement `getFileIcon(fileName)` returning `{ iconClass, colorClass }` in
`edit.js` and reuse in `save.js`.

### 6) Inspector controls

Single `PanelBody` titled "Editor Settings":
- `TextControl` → Project Name (`projectName`)
- `TextControl` → File Name (`fileName`) — with placeholder `"index.ts"`
- `TextControl` → File Path (`filePath`) — with placeholder `"src/components"`,
  help text: "Slash-separated path shown in the breadcrumb, e.g. src/components"
- `TextControl` → Language (`language`) — shown in status bar, placeholder `"TypeScript JSX"`
- `TextControl` → Branch (`branch`) — shown in status bar, placeholder `"main"`

### 7) Collapse behaviour (CSS only, no JS)

When the block is narrow (approximately < 480px rendered width), the activity bar
and right sidebar should hide. Implement via a CSS container query on the block root:

```css
@container (max-width: 480px) {
  .wp-block-frames-vscode__activity { width: 0; opacity: 0; border-right: none; overflow: hidden; }
  .wp-block-frames-vscode__inner-zones {
    grid-template-columns: 1fr 1fr 1fr 0;
    grid-template-areas:
      "tabs     tabs     tabs     ."
      "crumb    crumb    crumb    ."
      "code     code     code     ."
      "terminal terminal terminal .";
  }
  .wp-block-frames-vscode__inner-zones > .wp-block-list {
    display: none;
  }
}
```

No ResizeObserver or JS is required — the mockup's JS-based collapse is replaced
entirely by this container query.

### 8) Design tokens — full `:root` block for `style.scss`

Define all tokens listed below in a `:root` block at the top of `style.scss`.
Mark supplementary tokens (those not in `_frames-ref.md`) with `/* (*) */`.

**From `_frames-ref.md` (canonical):**
```css
--frames-vscode-bg: #1e1e1e;
--frames-vscode-titlebar: #3c3c3c;
--frames-vscode-menubar: #3c3c3c;
--frames-vscode-menubar-border: #2a2a2a;
--frames-vscode-activity: #333333;
--frames-vscode-activity-border: #252526;
--frames-vscode-sidebar: #252526;
--frames-vscode-sidebar-border: #3c3c3c;
--frames-vscode-sidebar-header: #bbbbbb;
--frames-vscode-explorer-hover: rgba(255,255,255,.05);
--frames-vscode-explorer-active: #094771;
--frames-vscode-tabstrip: #2d2d2d;
--frames-vscode-tab-active-bg: #1e1e1e;
--frames-vscode-tab-active-top: #007acc;
--frames-vscode-tab-inactive: #2d2d2d;
--frames-vscode-tab-border: #252526;
--frames-vscode-editor-bg: #1e1e1e;
--frames-vscode-line-num: #858585;
--frames-vscode-line-num-active: #c6c6c6;
--frames-vscode-cursor: #aeafad;
--frames-vscode-selection: rgba(38,79,120,.6);
--frames-vscode-statusbar: #007acc;
--frames-vscode-statusbar-text: rgba(255,255,255,.85);
--frames-vscode-text: #d4d4d4;
--frames-vscode-text-dim: #858585;
--frames-vscode-icon-active: #ffffff;
--frames-vscode-icon-inactive: #858585;
```

**Supplementary (mark each with `/* (*) */`):**
```css
--frames-vscode-border: #474747;          /* (*) */
--frames-vscode-text-subtle: #6e6e6e;     /* (*) */
--frames-vscode-icon-ts: #3178c6;         /* (*) */
--frames-vscode-icon-js: #e8c84d;         /* (*) */
--frames-vscode-icon-folder: #dcb67a;     /* (*) */
```

### 9) Scaling — clamp reference table

Use these exact clamp values (derived from `native_px / 900 * 100cqw`):

| Element                    | Property  | clamp(min, preferred, max)          |
|----------------------------|-----------|-------------------------------------|
| Block root font-size       | font-size | clamp(10px, 1.02cqw, 13px)          |
| Titlebar height            | height    | clamp(22px, 2.34cqw, 30px)          |
| Activity btn size          | w + h     | clamp(32px, 3.75cqw, 48px)          |
| Activity btn icon          | font-size | clamp(14px, 1.72cqw, 22px)          |
| Sidebar width              | width     | clamp(140px, 17.19cqw, 220px)       |
| Explorer title font        | font-size | clamp(8px, 0.86cqw, 11px)           |
| Tree item height           | height    | clamp(16px, 1.72cqw, 22px)          |
| Tree label font            | font-size | clamp(9px, 0.98cqw, 12.5px)         |
| Tabs height                | height    | clamp(24px, 2.73cqw, 35px)          |
| Tab font                   | font-size | clamp(9px, 0.98cqw, 12.5px)         |
| Breadcrumb height          | height    | clamp(17px, 1.88cqw, 24px)          |
| Breadcrumb font            | font-size | clamp(9px, 0.94cqw, 12px)           |
| Code area font-size        | font-size | clamp(13px, 1.25cqw, 16px)          |
| Code area line-height      | line-height | clamp(19px, 1.875cqw, 24px)       |
| Status bar height          | height    | clamp(16px, 1.72cqw, 22px)          |
| Status bar font            | font-size | clamp(8px, 0.90cqw, 11.5px)         |
| Win-btn width              | width     | clamp(30px, 3.59cqw, 46px)          |
| Win-btn height             | height    | clamp(22px, 2.34cqw, 30px)          |
| Search bar width (max)     | max-width | clamp(160px, 32.81cqw, 420px)       |

### 10) Accessibility

- Block root: `role="img"` with `aria-label` derived from `projectName`.
- Activity bar and sidebar: `aria-hidden="true"` (purely decorative).
- InnerBlocks zone: standard block editing affordances — no extra ARIA needed.

### 11) Editor-only styles (`editor.scss`)

- Add a subtle dashed outline `1px dashed rgba(0,122,204,.4)` to the three
  InnerBlocks zones — the sidebar list zone (`.wp-block-frames-vscode__tree-list`
  area), the code-syntax-highlighter (`__code-zone`), and the terminal strip
  (`__terminal-zone`) — so the user can see where to click to activate each zone.
- Remove this outline in the frontend (`style.scss` does not include it).
- In the Gutenberg block editor, the block root should enforce the aspect ratio
  and scaling so the editor preview matches the frontend exactly.

### 12) Quality gates

- No hardcoded hex, px, or arbitrary values outside the `:root` token block.
- ESLint and Stylelint pass for all touched files.
- No console errors in the block editor under normal operation.
- `save.js` output is deterministic and identical to `edit.js` preview.
- `InnerBlocks.Content` is used in `save.js` (not `InnerBlocks`).

---

## Deliverables

1. Complete file contents for all six files listed in the file map.
2. Short rationale for the CSS-grid single-InnerBlocks approach vs multi-zone.
3. Known v1 limitations (e.g. tree icons rely on text/emoji; no split-pane resize; terminal strip height is content-driven, not user-resizable).
4. Manual QA checklist:
   - Insert block, verify VS Code chrome renders at default size.
   - Confirm layout: file tree on the RIGHT column, code editor top-left area,
     terminal strip bottom-left area.
   - Resize the block narrow (< 480px) — activity bar and right sidebar collapse;
     code editor and terminal strip expand to full width.
   - Edit `projectName`, `fileName`, `filePath`, `language`, `branch` in
     Inspector — verify all chrome updates live.
   - Click the list block zone — verify only list blocks can be inserted.
   - Click the code editor zone — verify only `frameblocks/code-syntax-highlighter`
     can be inserted.
   - Click the terminal strip zone — verify only `frameblocks/code-syntax-highlighter`
     can be inserted; enable `isTerminal` mode and confirm terminal syntax styling.
   - Save post and verify frontend HTML matches editor preview.
   - Verify no validation errors in the block editor after save/reload.
   - Add custom classes (`wp-block-frames-vscode__tree-item--folder`,
     `--active`, `--depth-2`) to list items via the Advanced panel — verify
     visual tree appearance.
```
