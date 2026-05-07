=== FrameBlocks ===
Contributors: laloptk
Tags: blocks, gutenberg, frames, syntax highlighter, mockup
Requires at least: 6.8
Tested up to: 6.9
Stable tag: 0.1.0
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Decorative UI frame blocks for the Gutenberg editor — browser windows, device mockups, VS Code shell, social posts, and more.

== Description ==

FrameBlocks gives content creators and developers a set of Gutenberg blocks that wrap content inside realistic UI mockups — without leaving the WordPress editor.

**Included blocks:**

* **Browser Frame** — Safari or Chrome browser shell wrapping any inner content
* **Code Editor Frame** — VS Code editor shell with sidebar, code zone, and terminal
* **Code Syntax Highlighter** — Syntax-highlighted code powered by Shiki (50+ languages)
* **Device Frame** — Phone, tablet, or laptop device shell
* **File Tree** — VS Code-style file/folder tree
* **File Tree Item** — Individual file or folder row inside a file tree
* **Social Post** — Instagram or Facebook post mockup
* **Social Comment** — Comment row nested inside a social post

All blocks are fully responsive using CSS container queries (`cqw` units), so they scale automatically with the column width — no manual resizing needed.

== Installation ==

1. In your WordPress admin go to **Plugins → Add New → Upload Plugin**.
2. Upload the `frame-blocks.zip` file and click **Install Now**.
3. Activate the plugin.
4. Open any post or page in the Gutenberg editor and search for "Frame" in the block inserter.

== Frequently Asked Questions ==

= Does this plugin work with the classic editor? =

No. FrameBlocks is built exclusively for the Gutenberg block editor (WordPress 6.8+).

= Are the frames responsive? =

Yes. All frames use CSS container queries and scale fluidly with the column they are placed in.

= Does the plugin load external resources? =

No. All assets — including icon fonts — are bundled locally with the plugin. No external requests are made.

= Which syntax languages does the code highlighter support? =

The Code Syntax Highlighter block uses [Shiki](https://shiki.style/) and supports over 50 languages including JavaScript, TypeScript, PHP, Python, HTML, CSS, Bash, and more.

== Screenshots ==

1. Browser Frame block — Chrome and Safari variants.
2. VS Code Editor Frame with File Tree and Syntax Highlighter inside.
3. Device Frame — phone, tablet, and laptop variants.
4. Social Post block — Instagram and Facebook mockups.

== Changelog ==

= 0.1.0 =
* Initial release with 8 blocks: Browser Frame, Code Editor Frame, Code Syntax Highlighter, Device Frame, File Tree, File Tree Item, Social Post, Social Comment.
