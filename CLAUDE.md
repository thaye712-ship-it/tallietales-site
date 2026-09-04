# Working on the Tallie Tales site

The public website for Tallie Tales LLC and its iPhone app, **Drive Log** (the app
itself lives in the `pile-log-app` repo). Three hand-written static pages — `index.html`,
`support.html`, `privacy.html` — with inline CSS. No framework, no build step, no
dependencies. Each page is self-contained, so a colour or nav change has to be made in
all three.

## Which model does what

Nearly everything here is Sonnet work: copy edits, a new section, a FAQ entry, keeping
the feature list in step with the app. Delegate it with the Agent tool and
`model: "sonnet"`.

Reach for Fable only when the change is not really about this repo's HTML — an App
Store or privacy-policy claim that has to match what the app actually does, or anything
touching DNS and publishing.

## Publishing — the part that is easy to get wrong

GitHub Pages serves this site from the **`claude/basic-website-b4flaw`** branch. Work
committed to a feature branch is *not* live, however green the push looked; it goes live
when it reaches that branch. The published site is
`https://thaye712-ship-it.github.io/tallietales-site/`, and it updates about a minute
after the push — worth actually checking with `curl` rather than assuming.

`tallietales.com` is registered but **not yet connected**: the Cloudflare DNS records in
`SETUP.md` step 4c have not been created. Do not tell the user the site is live at the
custom domain until that is done and the domain actually resolves.

## Keep it honest

These pages are what the App Store review reads and what a customer relies on.

- Every feature claimed on `index.html` must exist in the shipped app. When in doubt,
  check `BUILD_LOG.md` in `pile-log-app` rather than describing something from memory.
- `privacy.html` must describe what the app really does with the microphone and with
  recorded data. The app analyses audio live, never stores or transmits it, and keeps
  every log on the device.
- Do not invent screenshots, testimonials, or company details. There are no real
  screenshots in this repo yet; if the page needs them, ask for them.
