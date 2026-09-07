# Tallie Tales LLC — website

The public website for Tallie Tales LLC and its iPhone app, **Drive Log**.

Static HTML and CSS — no framework, no build step, no dependencies, nothing to
install. GitHub Pages serves the files exactly as they are.

## Files

| File           | Serves as                | Used for                              |
| -------------- | ------------------------ | ------------------------------------- |
| `index.html`   | Company + product home   | Apple Organization enrollment website |
| `support.html` | Drive Log support & FAQ  | App Store **Support URL**             |
| `privacy.html` | Privacy policy           | App Store **Privacy Policy URL**      |
| `style.css`    | All styling, shared      | Colours, layout, animation            |
| `site.js`      | Scroll reveal + counter  | Optional polish only                  |

`SETUP.md` is the deployment walkthrough: DNS, GitHub Pages, Apple enrollment,
and the App Store Connect fields. It also tracks what is done and what is not.

## Viewing it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing

- **Text** lives directly in the `.html` files.
- **Colours, spacing, fonts** are CSS custom properties at the top of
  `style.css`. Change them once there and all three pages follow. A dark-mode
  palette is defined in the same file and follows the visitor's system setting.
- **The contact address** is `piledrivingapp@tallietales.com`, written into all
  three pages. Changing it means find-and-replace across those three files.
- To add a page, copy `support.html`, replace the content, and add a link to the
  `<nav>` and the footer of the other pages.

## About the animation

`site.js` fades sections in as they scroll into view and drives the blow counter
in the hero illustration. It is **entirely optional**: with JavaScript disabled
or the file missing, every page renders complete and readable — the reveal
styles only activate once the script confirms it is running.

The pile driver in the hero is inline SVG animated with CSS keyframes, so there
is no image file, no library, and nothing to load.

Both respect `prefers-reduced-motion`. A visitor who has asked their system to
reduce motion sees the finished state with no movement at all.
