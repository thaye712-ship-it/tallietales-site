# Tallie Tales

A very basic static website. Plain HTML and CSS — no frameworks, no build step,
no dependencies.

## Files

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| `index.html` | Home page (hero, sections, contact)      |
| `about.html` | About page                               |
| `style.css`  | All styling, shared by both pages        |

## Viewing it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing

The site is static, so it can be hosted anywhere. For GitHub Pages: repository
**Settings → Pages**, then set the source to this branch with the folder set to
`/ (root)`.

## Editing

- Text lives directly in the `.html` files; the placeholder copy is meant to be
  replaced.
- Colours, spacing, and fonts are CSS custom properties at the top of
  `style.css`. Dark mode follows the visitor's system setting and uses the same
  variables.
- To add a page, copy `about.html`, change the title and content, and add a link
  to the `<nav>` in both existing pages.
