# FRAMES PLUGIN — DESIGN REFERENCE v1.0
# Machine-readable by Claude Code. Not for human rendering.
# Source of truth: design-system.html. Update both when tokens change.

## BEM / NAMING
block-root  : wp-block-frames-[ctx]
element     : wp-block-frames-[ctx]__[el]
modifier    : wp-block-frames-[ctx]__[el]--[mod]  OR  wp-block-frames-[ctx]--[mod]
token       : --frames-[ctx]-[property]
FORBIDDEN   : nested elements (__el__el)  |  hardcoded hex in component CSS  |  transform:scale()
ctx-codes   : laptop  tablet  phone  safari  chrome  vscode  ig  fb  li  wa  tg

## SCALING TECHNIQUE
- container-type:size on block root only (no container-type on children)
- All sizes: clamp(floor, (native_px / REF_W) * 100 cqw, native_px)
- REF_W by context: browser=860  vscode=900  ig=614  fb=680  li=660  wa/tg=375  phone=280
- Content overflows naturally (overflow:auto). No JS resizing.
- Aspect ratios: browsers=4/2.7  vscode=16/10
- Stage sizing: width:min(94vw, calc(94vh * (W/H)));  aspect-ratio:W/H

## COMPONENT STATES (universal)
default        : base token values, no modifier
:hover         : bg ±6–8%, transition:100ms ease-out
:focus-visible : 2px outline + 3px offset, context accent color
--active       : filled with context primary, text inverted, transform:scale(.97)
[disabled]     : opacity:.45; cursor:not-allowed; pointer-events:none

## DO / DON'T
DO  : var(--frames-…) for all values | wp-block-frames- prefix | BEM __/-- | all 5 states | clamp()+cqw
DONT: hardcode hex/px | skip prefix | __el__el | arbitrary gaps (use scale) | z-index numbers | transform:scale()

## ICON LIBRARY
Font Awesome 6.5 CDN (free tier) — no SVGs inline.
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
Usage: fa-solid fa-[name] | fa-regular fa-[name] | fa-brands fa-[name]

---

## TOKENS — GLOBAL SCALES

SPACING (base 4px)
--frames-space-0:0  --frames-space-1:4px  --frames-space-2:8px  --frames-space-3:12px
--frames-space-4:16px  --frames-space-5:20px  --frames-space-6:24px  --frames-space-7:28px
--frames-space-8:32px  --frames-space-10:40px  --frames-space-12:48px  --frames-space-16:64px
--frames-space-20:80px  --frames-space-24:96px

RADIUS
--frames-radius-none:0  --frames-radius-xs:2px  --frames-radius-sm:4px  --frames-radius-md:8px
--frames-radius-lg:12px  --frames-radius-xl:16px  --frames-radius-2xl:24px  --frames-radius-3xl:32px
--frames-radius-pill:9999px  --frames-radius-round:50%
device: laptop-body:12px  laptop-screen:6px  laptop-base:8px  tablet-body:24px  tablet-screen:4px
        phone-body:44px  phone-screen:34px  browser:8px  browser-tab:8px  browser-input:20px  vscode:8px

SHADOW
--frames-shadow-xs:  0 1px 2px rgba(0,0,0,.08)
--frames-shadow-sm:  0 1px 4px rgba(0,0,0,.10), 0 1px 2px rgba(0,0,0,.06)
--frames-shadow-md:  0 4px 12px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.08)
--frames-shadow-lg:  0 8px 24px rgba(0,0,0,.16), 0 4px 8px rgba(0,0,0,.10)
--frames-shadow-xl:  0 16px 48px rgba(0,0,0,.20), 0 6px 16px rgba(0,0,0,.12)
--frames-shadow-device: 0 32px 80px rgba(0,0,0,.40), 0 8px 24px rgba(0,0,0,.22)
--frames-shadow-inset:  inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(0,0,0,.10)

ICON SIZES
--frames-icon-xs:12px(nav/meta) --frames-icon-sm:14px(inline) --frames-icon-md:16px(UI default)
--frames-icon-lg:20px(action-bar IG/FB/LI) --frames-icon-xl:24px(primary/WA/TG)
--frames-icon-2xl:32px(empty-state) --frames-icon-3xl:48px(placeholder/hero)

Z-INDEX
--frames-z-base:0  --frames-z-raised:10  --frames-z-overlay:20
--frames-z-modal:30  --frames-z-toast:40  --frames-z-top:50

---

## TOKENS — DEVICE SHELLS

LAPTOP (AirBook Pro, silver aluminum)
--frames-laptop-shell-top:#d0d0d0  --frames-laptop-shell-mid:#b8b8b8  --frames-laptop-shell-bot:#a8a8a8
--frames-laptop-bezel:#111111  --frames-laptop-hinge:#909090
--frames-laptop-base-top:#c0c0c0  --frames-laptop-base-bot:#a0a0a0
--frames-laptop-logo:rgba(255,255,255,.18)  --frames-laptop-camera:#2a2a2a
--frames-laptop-screen-bg:#ffffff  --frames-laptop-screen-padding:14px

TABLET (ProPad M, silver aluminum, portrait)
--frames-tablet-shell-top:#c4c4c4  --frames-tablet-shell-bot:#a8a8a8
--frames-tablet-bezel-color:rgba(255,255,255,.30)  --frames-tablet-btn:#969696
--frames-tablet-camera:#2a2a2a  --frames-tablet-home-btn:#b0b0b0  --frames-tablet-screen-bg:#ffffff

PHONE (Velox X, space black)
--frames-phone-shell-outer:#1c1c1e  --frames-phone-shell-inner:#111111
--frames-phone-rail:rgba(255,255,255,.08)  --frames-phone-btn:#2a2a2a
--frames-phone-notch:#111111  --frames-phone-camera-lens:#0a1a2a  --frames-phone-speaker:#2a2a2a
--frames-phone-home-bar:rgba(255,255,255,.30)  --frames-phone-screen-bg:#ffffff
--frames-phone-status-color:#000000(light-screen)  --frames-phone-status-color-dark:#ffffff(dark-screen)

---

## TOKENS — SAFARI
font: -apple-system, 'Helvetica Neue', sans-serif
--frames-safari-toolbar-top:#f7f7f7  --frames-safari-toolbar-bot:#ebebeb  --frames-safari-border:#d0d0d0
--frames-safari-tab-active:#ffffff  --frames-safari-tab-inactive:#dcdcdc  --frames-safari-tab-strip:#e0e0e0
--frames-safari-input-bg:#ffffff  --frames-safari-input-border:#c8c8c8
--frames-safari-text:#333333  --frames-safari-url-text:#1a1a1a  --frames-safari-url-domain:#000000
--frames-safari-icon:#555555
--frames-safari-btn-close:#ff5f57(border:#e0443e)  --frames-safari-btn-min:#febc2e(border:#d4a017)
--frames-safari-btn-max:#28c840(border:#1aab29)

## TOKENS — CHROME
font: 'Roboto', -apple-system, sans-serif
--frames-chrome-tabstrip:#dee1e6  --frames-chrome-toolbar:#f1f3f4  --frames-chrome-border:#dadce0
--frames-chrome-tab-active:#ffffff  --frames-chrome-tab-inactive:#c8ccd1  --frames-chrome-tab-hover:#e8eaed
--frames-chrome-input-bg:#ffffff  --frames-chrome-input-shadow:0 1px 3px rgba(0,0,0,.12)
--frames-chrome-input-focus:rgba(66,133,244,.20)
--frames-chrome-text:#202124  --frames-chrome-text-secondary:#5f6368
--frames-chrome-url-text:#202124  --frames-chrome-url-domain:#202124  --frames-chrome-icon:#5f6368
--frames-chrome-blue:#1a73e8  --frames-chrome-blue-alt:#4285f4
--frames-chrome-bookmarks-bg:#f1f3f4
--frames-chrome-favicon-bg:linear-gradient(135deg,#4285f4 0%,#34a853 100%)
--frames-chrome-btn-close:#ff5f57  --frames-chrome-btn-min:#febc2e  --frames-chrome-btn-max:#28c840
NOTE: Chrome frame uses WINDOWS-style controls (top-right, rectangular flat) not macOS traffic lights.
  win-close hover: #c42b1c | win-min/max hover: rgba(0,0,0,.08)

## TOKENS — VS CODE (Dark+ theme)
font-ui: 'Segoe UI', system-ui, sans-serif | font-code: 'Fira Code', 'Source Code Pro', Consolas, monospace
--frames-vscode-bg:#1e1e1e  --frames-vscode-titlebar:#3c3c3c  --frames-vscode-menubar:#3c3c3c
--frames-vscode-menubar-border:#2a2a2a  --frames-vscode-activity:#333333
--frames-vscode-activity-border:#252526  --frames-vscode-sidebar:#252526
--frames-vscode-sidebar-border:#3c3c3c  --frames-vscode-sidebar-header:#bbbbbb
--frames-vscode-explorer-hover:rgba(255,255,255,.05)  --frames-vscode-explorer-active:#094771
--frames-vscode-tabstrip:#2d2d2d  --frames-vscode-tab-active-bg:#1e1e1e
--frames-vscode-tab-active-top:#007acc  --frames-vscode-tab-inactive:#2d2d2d
--frames-vscode-tab-border:#252526  --frames-vscode-editor-bg:#1e1e1e
--frames-vscode-line-num:#858585  --frames-vscode-line-num-active:#c6c6c6
--frames-vscode-cursor:#aeafad  --frames-vscode-selection:rgba(38,79,120,.6)
--frames-vscode-statusbar:#007acc  --frames-vscode-statusbar-text:rgba(255,255,255,.85)
--frames-vscode-text:#d4d4d4  --frames-vscode-text-dim:#858585
--frames-vscode-icon-active:#ffffff  --frames-vscode-icon-inactive:#858585
SYNTAX: keyword:#569cd6  string:#ce9178  comment:#6a9955  function:#dcdcaa  variable:#9cdcfe
        number:#b5cea8  type:#4ec9b0  constant:#4fc1ff  operator:#d4d4d4  tag:#f44747
        attr:#9cdcfe  value:#ce9178  property:#9cdcfe  punctuation:#d4d4d4  class:#4ec9b0  regex:#d16969

## TOKENS — INSTAGRAM
font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
--frames-ig-bg:#fafafa  --frames-ig-surface:#ffffff  --frames-ig-border:#dbdbdb
--frames-ig-border-light:#efefef  --frames-ig-text-primary:#262626  --frames-ig-text-secondary:#8e8e8e
--frames-ig-text-link:#00376b  --frames-ig-blue:#0095f6  --frames-ig-blue-hover:#1877f2
--frames-ig-red:#ed4956  --frames-ig-story-ring:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)
--frames-ig-avatar-size-lg:38px  --frames-ig-avatar-size-sm:28px
--frames-ig-font-size-username:14px  --frames-ig-font-size-body:14px
--frames-ig-font-size-meta:12px  --frames-ig-font-size-timestamp:10px  --frames-ig-font-weight-bold:600

## TOKENS — FACEBOOK
font: 'Segoe UI', Helvetica, Arial, sans-serif
--frames-fb-bg:#f0f2f5  --frames-fb-surface:#ffffff  --frames-fb-border:#ced0d4
--frames-fb-border-light:#e4e6eb  --frames-fb-text-primary:#050505  --frames-fb-text-secondary:#65676b
--frames-fb-text-placeholder:#8a8d91  --frames-fb-blue:#1877f2  --frames-fb-blue-hover:#166fe5
--frames-fb-blue-light:#e7f3ff  --frames-fb-hover:#f2f2f2
reactions: like:#1877f2  love:#f33e58  haha/wow/sad:#f7b125  angry:#e9710f
--frames-fb-avatar-size:40px  --frames-fb-font-size-name:15px  --frames-fb-font-size-body:15px
--frames-fb-font-size-body-lg:22px  --frames-fb-font-size-meta:13px  --frames-fb-font-size-action:15px
--frames-fb-font-weight-bold:600  --frames-fb-radius-card:8px  --frames-fb-radius-btn:6px  --frames-fb-radius-input:20px

## TOKENS — LINKEDIN
font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
--frames-li-bg:#f3f2ef  --frames-li-surface:#ffffff  --frames-li-border:rgba(0,0,0,.12)
--frames-li-border-strong:rgba(0,0,0,.20)  --frames-li-text-primary:rgba(0,0,0,.90)
--frames-li-text-secondary:rgba(0,0,0,.60)  --frames-li-text-placeholder:rgba(0,0,0,.40)
--frames-li-blue:#0a66c2  --frames-li-blue-hover:#004182  --frames-li-blue-light:#e8f3ff
--frames-li-blue-action-bg:rgba(10,102,194,.08)  --frames-li-green:#057642
--frames-li-premium:#b24020  --frames-li-hover:#f3f2ef
--frames-li-avatar-size-lg:48px  --frames-li-avatar-size-sm:32px
--frames-li-font-size-title:18px  --frames-li-font-size-name:16px  --frames-li-font-size-headline:13px
--frames-li-font-size-body:14px  --frames-li-font-size-meta:12px  --frames-li-font-size-action:14px
--frames-li-font-weight-bold:600  --frames-li-radius-card:8px  --frames-li-radius-btn:16px  --frames-li-radius-tag:4px

## TOKENS — WHATSAPP
font: 'Segoe UI', Helvetica, Arial, sans-serif
--frames-wa-bg:#efeae2  --frames-wa-bg-pattern:rgba(0,0,0,.04)
--frames-wa-header:#075e54  --frames-wa-header-gradient:linear-gradient(to bottom,#075e54,#054d44)
--frames-wa-green:#25d366  --frames-wa-green-dark:#128c7e  --frames-wa-teal:#00bfa5
--frames-wa-bubble-out:#d9fdd3(border:#c5e8bf)  --frames-wa-bubble-in:#ffffff(border:#f0f0f0)
--frames-wa-text-primary:#111b21  --frames-wa-text-secondary:#667781  --frames-wa-text-meta:#8696a0
--frames-wa-check-read:#53bdeb  --frames-wa-check-sent:#8696a0
--frames-wa-input-bg:#ffffff  --frames-wa-inputbar-bg:#f0f2f5
--frames-wa-date-chip-bg:rgba(225,245,254,.92)  --frames-wa-avatar-size:38px
--frames-wa-font-size-name:16px  --frames-wa-font-size-status:13px  --frames-wa-font-size-bubble:14.5px
--frames-wa-font-size-meta:11px  --frames-wa-font-size-input:15px
--frames-wa-bubble-radius:8px  --frames-wa-bubble-tail-size:8px

## TOKENS — TELEGRAM
font: 'Roboto', sans-serif
--frames-tg-bg:#efeff3  --frames-tg-header:#517da2
--frames-tg-header-gradient:linear-gradient(135deg,#64b3f4 0%,#2ca5e0 50%,#1a96d0 100%)
--frames-tg-blue:#2ca5e0  --frames-tg-blue-dark:#1a8ac4  --frames-tg-blue-light:#63bfec
--frames-tg-bubble-out:#effdde(border:#d9f0c8)  --frames-tg-bubble-in:#ffffff(border:#e8e8e8)
--frames-tg-text-primary:#000000  --frames-tg-text-secondary:#999999
--frames-tg-sender-color:#2ca5e0  --frames-tg-check-read:#2ca5e0  --frames-tg-check-sent:#aaaaaa
--frames-tg-input-bg:#ffffff  --frames-tg-inputbar-bg:#ffffff  --frames-tg-inputbar-border:#e5e5e5
--frames-tg-date-chip-bg:rgba(0,0,0,.25)  --frames-tg-avatar-size:38px
--frames-tg-font-size-name:16px  --frames-tg-font-size-status:13px  --frames-tg-font-size-bubble:14.5px
--frames-tg-font-size-sender:14px  --frames-tg-font-size-meta:11px  --frames-tg-font-size-input:15px
--frames-tg-bubble-radius:12px

---

## APP CONTEXT SPECS

DEVICE SHELLS
laptop : width=760px  screen-min-h=420px  body-r=12px  shadow=--frames-shadow-device
tablet : width=420px  screen-min-h=540px  orientation=portrait  body-r=24px  shadow=--frames-shadow-device
phone  : width=280px(outer)  screen-min-h=560px  notch=pill/dynamic-island  body-r=44px  shadow=--frames-shadow-device

SAFARI
max-w=860px  aspect=4/2.7  toolbar-bg=gradient(#f7f7f7→#ebebeb)  border=#d0d0d0
tab-r=8px top only  address-bar=centered  body-r=12px  traffic-lights=macOS top-left

CHROME
max-w=860px  aspect=4/2.7  tabstrip=#dee1e6  toolbar=#f1f3f4  border=#dadce0
omnibox-r=20px+shadow  body-r=8px  win-controls=Windows-style top-right flat rectangular
structure: tabstrip-row(tabs+win-controls) → toolbar-row(nav+omnibox+icons) → viewport(transparent)

VS CODE (Dark+)
max-w=900px  aspect=16/10  editor-bg=#1e1e1e  sidebar-w=220px  activity-bar-w=48px
statusbar=#007acc h=22px  code-font=13–16px/1.65lh  body-r=8px
structure: titlebar → menubar → body(activity|sidebar|editor+panel) → statusbar

INSTAGRAM POST
desktop=614px  tablet=468px  phone=375px(no border)  image-ratio=1:1
avatar-lg=38px+story-ring  card-border=#dbdbdb(desktop only)

FACEBOOK POST
desktop=680px  tablet=500px  phone=375px(no radius)  image-ratio=16:9
avatar=40px  card-r=8px

LINKEDIN JOB POST (phone frame)
desktop=660px  tablet=500px  phone=375px  avatar-lg=48px
job-banner-h=80px gradient  company-logo=56px offset=-36px

WHATSAPP CONVERSATION
default-w=375px  stretch=max-width:100%  chat-bg=#efeae2+pattern
bubble-out: #d9fdd3, r=8px 8px 2px 8px  bubble-in: #ffffff, r=8px 8px 8px 2px
font=14.5px/1.4lh

TELEGRAM CONVERSATION
default-w=375px  stretch=max-width:100%  chat-bg=#efeff3
header-gradient:#64b3f4→#2ca5e0  bubble-out:#effdde r=12px 12px 2px 12px
sender-name=14px/500/#2ca5e0

---

## FILE INVENTORY
frame-safari.html        — Safari browser frame (macOS, traffic lights top-left). NOT YET BEM-refactored.
frame-chrome.html        — Chrome browser frame (Windows-style controls top-right). BEM: wp-block-frames-chrome
frame-vscode-scalable.html — VS Code editor frame (fluid cqw). BEM: wp-block-frames-vscode
frame-linkedin-job.html  — LinkedIn job post in phone shell. BEM: wp-block-frames-linkedin
frame-instagram-post.html — Instagram post card. NOT YET BEM-refactored.
frame-facebook-post.html  — Facebook post card. NOT YET BEM-refactored.
frame-devices.html       — All device shells together. NOT YET BEM-refactored.
frame-vscode.html        — Old VS Code frame (uses transform:scale). DEPRECATED — use frame-vscode-scalable.html.
design-system.html       — Master design system doc (source of truth for all tokens).
_frames-ref.md           — THIS FILE. Compact token/spec reference for Claude Code.

## SUPPLEMENTARY TOKEN PATTERN
When a value needed for a frame does not exist in the design system tokens,
define it in the frame file's own :root block following the same naming convention,
and mark it with a comment: (* supplementary — not yet in design-system.html)
Example: --frames-chrome-win-close-hover: #c42b1c; /* (*) */
