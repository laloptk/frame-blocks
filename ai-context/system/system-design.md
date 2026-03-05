# WP Frame Blocks — System Design & Requirements

## 1. Project Overview

### 1.1 What we are going to build

- WordPress plugin named **“WP Frame Blocks”**.
- A set of **Gutenberg blocks** that act as **frames** (wrapper markup + styles) for other blocks (InnerBlocks) or for templated content.

### 1.2 Goals

- Provide reusable frames for UI/device simulation inside WordPress content.
- Keep blocks scalable, extensible, and consistent through a shared design system.

### 1.3 Non-goals

- (Describe what you explicitly won’t build in v1: e.g., no API calls, no cloud sync, no analytics, no premium library, etc.)

---

## 2. Scope

### 2.1 Block categories in scope

### A) Decorative Frame Blocks (wrappers)

- Device frames (Smartphone, Tablet, Laptop)
- Browser frames (Safari, Windows Chrome)
- Code editor frame (VS Code frame)

### B) Application Frame Blocks (templated + editable)

- LinkedIn Job Post
- Facebook Post
- Instagram Post
- WhatsApp Conversation
- Telegram Conversation
- Code Syntax Highlighter
- Terminal Syntax Highlighter

### 2.2 Out of scope (for now)

- (Anything you want to delay: variations marketplace, import/export templates, theme builder integration, etc.)

---

## 3. Users and Use Cases

### 3.1 Target users

- (Who: dev bloggers, agencies, SaaS marketing sites, portfolio builders, documentation sites)

### 3.2 Primary use cases

- (Example: “show UI mockups in blog posts”, “simulate mobile screenshots”, “embed code snippets with a VS Code-like wrapper”)

### 3.3 Secondary use cases

- (Example: “social proof frames”, “job post examples”, “chat screenshots for tutorials”)

---

## 4. Requirements

### 4.1 Functional requirements

- Frames must support InnerBlocks where appropriate.
- Templated blocks must expose editable areas via block attributes + inspector controls.
- Blocks must render correctly both in editor and frontend.

### 4.2 Non-functional requirements

- **Performance:** avoid heavy runtime work; keep markup lean; avoid unnecessary re-renders.
- **Accessibility:** semantic markup, contrast, keyboard navigation where relevant.
- **Security:** sanitize and escape any dynamic content rendered by PHP (if/when used).
- **Compatibility:** support modern WP versions and block editor behavior.

### 4.3 Constraints

- Mostly static blocks using `edit.js`, `save.js`, `style.scss`, `editor.scss`.
- Must scale with aspect ratios and provide ratio options per block/frame.

---

## 5. Plugin Architecture

### 5.1 Repo / folder structure

- `src/blocks/[block-name]/` for block implementations
- `src/components/` shared React components
- `src/hooks/` shared custom hooks
- `src/helpers/` helper utilities
- `includes/` PHP classes and bootstrapping
- Composer autoload for PHP classes

### 5.2 Build tooling

- Uses `@wordpress/scripts` for JS build pipeline.

### 5.3 Import aliases

- Aliases like:
    - `@wpfb/hooks`
    - `@wpfb/components`
    - `@wpfb/helpers`
- (Include where they are configured: webpack override / babel plugin / jsconfig/tsconfig paths)

### 5.4 Namespacing + autoloading

- PHP namespaced classes.
- Composer generates autoload file.
- (Specify namespace root and directory mapping)

---

## 6. Design System and UI Foundations

### 6.1 Design tokens

- Fonts, colors, spacing, radii, shadows, etc.
- (Define naming rules for tokens)

### 6.2 Atomic design structure

- Apply atomic design for:
    - React components
    - SCSS partials/modules

### 6.3 CSS methodology

- BEM selector naming.
- (Define block wrapper naming convention, e.g. `.wpfb-frame`, `.wpfb-frame__header` etc.)

### 6.4 Source of truth for UI

- Design system file + HTML mockups located in:
    - `ai-context/design`
- These mockups already use BEM and WordPress-like markup to reduce friction.

---

## 7. Block System Design

### 7.1 Extensibility model

- Code must support adding:
    - new device frames
    - new browser frames
    - new application templates
    - entirely new frame categories
- (Describe the intended extension approach: shared base components, shared style modules, shared attribute patterns)

### 7.2 Composition strategy

- Use composition of reusable modules/components.
- Nested systems to build higher-level modules.

### 7.3 Scaling and aspect ratio rules

- All frame blocks must scale proportionally.
- Provide aspect ratio options so frames can fit different devices/layouts.

---

## 8. Block Catalog

### 8.1 Decorative Frame Blocks

### Device frames

- Smartphone Frame Block
- Tablet Frame Block
- Laptop Frame Block

### Browser frames

- Safari Frame Block
- Windows Chrome Frame Block

### Code editor frame

- VS Code Frame Block

### 8.2 Application Frame Blocks

- LinkedIn Job Post Block
- Facebook Post Block
- Instagram Post Block
- Code Syntax Highlighter Block
- Terminal Syntax Highlighter Block
- WhatsApp Conversation Block
- Telegram Conversation Block

---

## 9. Block Details and Specifications

> This section is for structural + behavioral specs (not visual styling).
> 

### 9.1 Device Frame Blocks

- Purely decorative.
- Allow all blocks as inner blocks.

### 9.2 Browser Frame Blocks

- Same as device blocks: purely decorative.
- Allow all blocks as inner blocks.

### 9.3 Code Editor Frame Blocks

### VS Code Frame Block

- Complex layout:
    - Left sidebar: accepts only headers + lists (folder structure simulation)
    - Main code area: accepts only **one** Code Syntax Highlighter inner block
    - Terminal area: accepts only **one** Terminal Syntax Highlighter inner block
- Defaults:
    - Insert default inner blocks into each area initially
    - Sidebar can accept more blocks; editor + terminal areas are locked
- Inspector controls:
    - TextAreaControl per area (sidebar, editor, terminal) stored in attributes
    - Title field in inspector controls
- `block.json` must include attributes for these fields

### 9.4 Application Frame Blocks

### LinkedIn Job Post Block

- Several editable areas (define exact areas: title, company, location, description, etc.)
- Fixed template elements remain consistent.

### Facebook Post Block

- (List editable fields + fixed template elements)

### Instagram Post Block

- Editable: image, username/handle, caption, comments text
- Fixed: templated UI chrome

### WhatsApp Conversation Block

- (Editable: participants, message bubbles, timestamps; Fixed: UI chrome)

### Telegram Conversation Block

- (Same idea)

### Code Syntax Highlighter Block

- (Editable: language, code content, optional filename, line numbers, etc.)

### Terminal Syntax Highlighter Block

- (Editable: content, prompt style, optional command/output formatting)

---

## 10. Editor UX Rules

### 10.1 Placeholder and defaults

- (How blocks appear when inserted; default template content; placeholder text rules)

### 10.2 InnerBlocks locking rules

- (Which areas are locked, allowed blocks, allowed templates)

### 10.3 Controls strategy

- What goes in:
    - InspectorControls
    - BlockControls (toolbar)
    - Inline editable areas

---

## 11. Data Model

### 11.1 Attributes naming conventions

- (Define attribute naming style, defaults, allowed values)

### 11.2 Serialization strategy

- Pure static `save.js` vs dynamic rendering (when/if a block becomes dynamic).
- (Specify when you’d switch to `render.php`)

---

## 12. PHP Responsibilities

- (What PHP does in v1: block registration, asset enqueues, versioning)
- (What PHP does later: dynamic rendering, migrations, etc.)

---

## 13. Performance Plan

- Bundle splitting strategy (if needed)
- Avoid heavy dependencies (or list acceptable ones)
- Minimize frontend CSS footprint
- Avoid runtime DOM measurements unless necessary

---

## 14. Accessibility Plan

- Keyboard navigation expectations (especially for templated UI blocks)
- Contrast and text scaling
- ARIA rules (only where needed)
- Reduced motion considerations (if animations exist)

---

## 15. Security Plan

- Content sanitization rules (especially if user input is rendered in PHP later)
- Escaping strategy in PHP
- Avoid unsafe HTML injection patterns in blocks

---

## 16. Compatibility and Support

- WordPress version range
- Gutenberg / editor assumptions
- Theme compatibility expectations (block themes vs classic themes)
- Responsiveness assumptions

---

## 17. Testing Strategy

- (Even if minimal for v1, define intent)
- Unit tests (PHP) / basic smoke tests (JS) / manual QA checklist

---

## 18. Release Plan

### 18.1 MVP definition

- (List which blocks ship in v1)

### 18.2 Versioning strategy

- (Semver-ish rules for block changes)

### 18.3 Packaging

- Build output structure, distribution zip rules

---

## 19. Future Ideas and Backlog

- New frame categories you might add later
- Premium add-on possibilities
- Template library / pattern packs
- Import/export of templates

---

## 20. Glossary

- Define terms like “frame block”, “application block”, “templated”, “decorative”, “locked inner blocks”, etc.