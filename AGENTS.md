# Repository Guidelines

## Project Structure & Module Organization
- Root plugin files: `wp-frame-blocks.php`, `package.json`, `webpack.config.js`.
- Source code lives in `src/`:
  - `src/blocks/<block-name>/`: Gutenberg block implementation (`block.json`, `edit`, `save`, styles).
  - `src/components/`: shared UI/components (including `style-controls`).
  - `src/helpers/`, `src/hooks/`, `src/services/`: reusable logic and utilities.
  - `src/styles/`: global stylesheet entry.
- Build output is generated in `build/` (ignored in git).
- Design/reference notes are in `ai-context/` (ignored in git).

## Build, Test, and Development Commands
- `npm run start`: runs WordPress scripts in watch mode for local development.
- `npm run build`: production build + block manifest generation.
- `npm run lint:js`: JavaScript/TypeScript lint checks.
- `npm run lint:css`: SCSS/CSS lint checks.
- `npm run format`: formats project files with WordPress tooling.
- `npm run plugin-zip`: creates a distributable plugin zip.

## Coding Style & Naming Conventions
- Use tabs/formatting consistent with existing Gutenberg files (`@wordpress/scripts` defaults).
- Block folders use kebab-case: `src/blocks/social-post/`.
- Exported component files use PascalCase when component-like (`AppendBlockButton`), otherwise descriptive names.
- Keep block class names in BEM style (e.g., `wp-block-frames-social__section--comments`).
- Prefer shared helpers/components over duplicating logic across blocks.

## Testing Guidelines
- No dedicated unit-test suite is currently configured.
- Minimum quality gate:
  1. `npm run lint:js`
  2. `npm run lint:css`
  3. `npm run build`
- For UI/block changes, manually verify in Gutenberg editor and frontend rendering.

## Commit & Pull Request Guidelines
- Follow Conventional Commit style seen in history:
  - `feat(scope): ...`
  - `refactor(scope): ...`
  - `fix(scope): ...`
- Keep commits focused by concern (e.g., component refactor vs block behavior).
- PRs should include:
  - concise summary of behavior changes,
  - affected blocks/files,
  - before/after screenshots for editor + frontend when UI changes,
  - validation steps run (`lint`, `build`).

## Security & Configuration Notes
- Do not commit `node_modules/`, `build/`, zips, or `ai-context/` contents.
- Keep block attributes explicit in `block.json`; avoid implicit runtime-only state.
