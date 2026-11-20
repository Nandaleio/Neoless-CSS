# Neoless CSS

A classless / class-light CSS library in the Neo Brutalism style: thick black borders, flat bold colours, and push-button motion.

Write plain semantic HTML and it gets styled. A handful of classes (`.card`, `.grid`, `.badge`, `.alert`, plus colour modifiers) cover patterns HTML has no element for.

## Usage

Download `neoless.min.css` from the [latest release](../../releases/latest) and link it:

```html
<link rel="stylesheet" href="neoless.min.css">
```

### Classes

| Class | Use |
|---|---|
| `.card` | Bordered surface with optional `header` / `footer` |
| `.grid` | Responsive auto-fit columns |
| `.badge` | Small label |
| `.alert` | Notification box |
| `.neutral` `.success` `.warning` `.danger` `.info` | Colour modifiers for buttons, cards, badges, alerts |
| `.reverse` `.flat` | Button motion variants |
| `.shadow` / `.flat` | Turn the offset shadow on / off for one element |

### Theming

All values are CSS custom properties in [`css/tokens.css`](css/tokens.css). Override them on `:root`:

```css
:root {
  --color-main: #a3e636;
  --radius-base: 0;
  --shadow-surface: var(--shadow); /* bring back offset shadows */
}
```

- Dark mode follows the OS; force it with `<html data-theme="dark">` or `"light"`.
- Accent presets: `<html data-accent="lime | yellow | orange | pink | violet | red">`.

## Development

```sh
npm ci
npm run build   # → dist/neoless.css and dist/neoless.min.css
npm run watch   # rebuild on change
```

Open `index.html` to see every element. It links the source files directly, so no build step is needed while you're working on the styles.

Source files live in `css/`; `css/index.css` is the bundle entry point. Browser targets are set in the `browserslist` field of `package.json`.

## Releasing

Releases are automatic: pushing a version tag builds the CSS and publishes a GitHub release with `neoless.css`, `neoless.min.css`, and a zip.

```sh
npm version minor        # or patch / major — bumps package.json, commits, tags
git push --follow-tags
```

The release workflow fails if the tag doesn't match the `package.json` version.
