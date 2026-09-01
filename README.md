# Tallie Tales LLC — website

The public website for Tallie Tales LLC and its iPhone app, **Drive Log**.

Three static pages, plain HTML with inline CSS — no framework, no build step, no
dependencies. Each page is self-contained so it can be edited or re-uploaded on
its own.

## Pages

| File           | Serves as                | Used for                              |
| -------------- | ------------------------ | ------------------------------------- |
| `index.html`   | Company + product home   | Apple Organization enrollment website |
| `support.html` | Drive Log support & FAQ  | App Store **Support URL**             |
| `privacy.html` | Privacy policy           | App Store **Privacy Policy URL**      |

`SETUP.md` is the full walkthrough: D-U-N-S number, domain, email at the domain,
GitHub Pages deployment, Apple enrollment, and the App Store Connect fields.
Read that first — it also lists the app-specific details to double-check before
submitting.

## Viewing it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing

Repository **Settings → Pages** → source *Deploy from a branch*, folder
`/ (root)`, and pick the branch these files are on. See `SETUP.md` step 4 for
the custom domain and HTTPS.

## Editing

Text lives directly in the `.html` files. Colours are CSS custom properties in
the `<style>` block at the top of each page; because the pages are
self-contained, a colour change has to be made in all three.
