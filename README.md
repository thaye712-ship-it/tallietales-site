# Tallie Tales LLC — website

The public website for Tallie Tales LLC and its app, **Pile Boss** — in open testing
on Google Play, and coming to iPhone and iPad once Apple enrollment clears.

Static HTML and CSS — no framework, no build step, no dependencies, nothing to
install. GitHub Pages serves the files exactly as they are.

## Files

| File           | Serves as                | Used for                              |
| -------------- | ------------------------ | ------------------------------------- |
| `index.html`   | Company + product home   | Apple Organization enrollment website |
| `support.html` | Pile Boss support & FAQ  | Store **Support URL** (Play and App Store) |
| `privacy.html` | Privacy policy           | Store **Privacy Policy URL** — required by Play |
| `style.css`    | All styling, shared      | Colours, layout, animation            |
| `site.js`      | Scroll reveal + counter  | Optional polish only                  |
| `img/`         | The app icon at 512, 180, 64 and 32 px | Header mark, hero, favicon, home-screen icon |

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
- **The contact addresses** are `piledrivingapp@tallietales.com` and
  `piledrivingapp@gmail.com`, both written into all three pages. Changing either
  means find-and-replace across those three files.
- **What the pages promise must match the app.** The feature list says *what* the
  app does, not *how* the blow counting works. `Pile-app-Android-/docs/WEBSITE.md`
  is the source of facts for this site — what may be claimed and what may not.
- **Pricing is one set of numbers on both platforms** (owner, 2026-09-23): the app
  is a **$49.99 one-time purchase**, **$9.99 introductory**, including 5 pile exports
  a calendar month; **Pro** adds unlimited exports at **$14.99/month or $119.99/year**,
  intro being a free first month then **$44.99 for the first year**. Android moved to
  match iOS, so `Pile-app-Android-/docs/PRICING.md` (a $49.99/year subscription with a
  free tier) is now **out of date** and the Android billing code with it. The numbers
  on `index.html` and `support.html` must match the Play Console products and App Store
  Connect; a site that disagrees with the store's own products is a rejection.
- **Feedback earns a discount code.** Both pages offer one for field feedback we can
  act on, and deliberately do not say how the code is delivered — that is handled
  directly with the owner and is not settled yet. Do not add redemption mechanics to
  the site until it is.
- **Two addresses, one inbox.** `piledrivingapp@tallietales.com` and
  `piledrivingapp@gmail.com` are both printed on all three pages.
- **The app icon** in `img/` is rendered from `Pile-Log-app/design/app-icon.html`
  (the same artwork as the App Store icon), with the iOS corner radius applied.
  When the icon changes, regenerate all four sizes from the new 1024 px PNG.
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
