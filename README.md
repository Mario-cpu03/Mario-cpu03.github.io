# Mario Pellegrino Ambrosone — Portfolio

A zero-dependency, Apple-inspired engineering portfolio built as a static website.

## Files

- `index.html` — semantic content and project case studies
- `styles.css` — responsive visual system, animations, project visualizations
- `script.js` — progressive reveals, subtle parallax/tilt, header behavior, QAM plot generation
- `assets/favicon.svg` — custom favicon

## Run locally

You can open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy with GitHub Pages

1. Create a repository such as `portfolio` or `Mario-cpu03.github.io`.
2. Upload the contents of this folder to the repository root.
3. In GitHub → **Settings → Pages**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. GitHub will publish the site automatically.

For a user site named `Mario-cpu03.github.io`, the URL will be `https://Mario-cpu03.github.io/`.

## Customize

The site intentionally uses no framework and no external font files. On Apple devices it uses the native system font stack, giving it an SF-like appearance without redistributing proprietary fonts.

Useful places to edit:

- Hero copy: `index.html` → `.hero-inner`
- Project order/content: `index.html` → `#work`
- Contact email: search for `marioambrosone03@gmail.com`
- Core palette: `styles.css` → `:root`
- Motion: `script.js`

The site respects `prefers-reduced-motion` and remains fully usable without JavaScript animations.
