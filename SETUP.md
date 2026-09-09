# Tallie Tales LLC website — setup guide

Three HTML files that satisfy Apple's requirements for an **Organization** developer account.
No coding required. Total cost: **$99/yr Apple + about $10–12/yr for a domain.** Hosting is free.

---

## Where things stand

| Step | Status |
|---|---|
| 1. D-U-N-S number | **Requested** — waiting on D&B, up to two weeks |
| 2. Domain (`tallietales.com`) | **Done** — registered |
| 3. Email at the domain | **Done** |
| 4. Site written and committed | **Done** — three pages, public repo |
| 4a. DNS records pointing at GitHub | Confirm in Cloudflare (see Step 2) |
| 4b. GitHub Pages switched on | **Done** — serves branch `live-website` |
| 4c. Custom domain + HTTPS | Confirm at Settings → Pages: domain check passes, *Enforce HTTPS* ticked |
| 5. Apple enrollment | Blocked by Step 1 (D-U-N-S) |
| 6. App Store Connect URLs | Needs the finished app |

The only things in your hands right now are 4a and 4b — set the DNS records and
switch Pages on. Everything after that is waiting: DNS propagation, then the HTTPS
certificate, then D&B. Apple enrollment cannot start until the D-U-N-S number
arrives regardless, so the site being live a day early costs nothing and being
late costs a day.

---

## What Apple actually requires

| Requirement | Where it's needed | Which file covers it |
|---|---|---|
| Company website on a domain you own | Organization enrollment | `index.html` |
| Work email at your own domain | Organization enrollment | (Step 2 below) |
| D-U-N-S number | Organization enrollment | (Step 1 below) |
| Support URL | Every app submission | `support.html` |
| Privacy Policy URL | Every app submission | `privacy.html` |

Apple explicitly rejects "social media links or minimal-content sites" for organization
enrollment, which is why `index.html` describes the company and the product rather than
being a one-line placeholder.

---

## Step 1 — Start the D-U-N-S number today (free, slowest step)

This takes up to two weeks, so start it before anything else.

1. Go to **developer.apple.com/enroll/duns-lookup**
2. Search for Tallie Tales LLC. If it already has a number, you're done — write it down.
3. If not, request one. It's free. Use the LLC's exact legal name and registered address,
   character for character as they appear on your formation documents. A mismatch here is
   the single most common cause of enrollment rejection.

---

## Step 2 — Buy the domain — **done**

`tallietales.com` is registered. Nothing further to do here.

If any hosting, website-builder, or email-hosting add-on was bundled at checkout,
turn it off — none of it is used. The domain name is all this setup needs.

### Set the DNS records — *do this now*

The domain is registered with **Cloudflare Registrar**, so its nameservers already
point at Cloudflare and DNS is edited there.

Go to **dash.cloudflare.com** → select `tallietales.com` → **DNS** → **Records** →
*Add record*, and add these five:

| Type | Name | Target / IPv4 address | Proxy status |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** (grey cloud) |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |
| CNAME | `www` | `thaye712-ship-it.github.io` | **DNS only** |

Cloudflare accepts `@` in the Name field and displays it afterwards as
`tallietales.com`. All four A records are required — they are GitHub's four Pages
servers.

**The proxy toggle is the one thing that will silently break this.** Cloudflare
defaults new records to *Proxied* (orange cloud). Leave it orange and GitHub
cannot complete the ACME challenge, so the HTTPS certificate never issues and
visitors get a security warning — with the site otherwise appearing to work.
Click each record's cloud icon until it reads **DNS only** and is grey.

**Do not delete the MX or TXT records.** Cloudflare Email Routing uses them to
deliver `piledrivingapp@tallietales.com`. Removing them breaks the address Apple uses to
verify the organization, and that address is printed on all three pages. You are
only adding records here, not clearing existing ones.

Cloudflare applies DNS changes in well under a minute, though other networks may
cache the old answer for a while.

---

## Step 3 — Get email at your domain (free)

Apple will not accept a Gmail address for **organization** enrollment. You need
`something@tallietales.com`. Two free ways:

**Option A — Cloudflare Email Routing (simplest, receive-only)**

Cloudflare → your domain → **Email** → Email Routing → enable. Create a rule forwarding
`piledrivingapp@tallietales.com` to your Gmail. Everything lands in your normal inbox. The catch
is your replies go out from your Gmail address.

Good enough for Apple's verification and for a low-volume support inbox.

**Option B — Zoho Mail free plan (a real mailbox)**

Free for up to 5 users, 5 GB each, one custom domain. You send *and* receive as
`piledrivingapp@tallietales.com`. Limitation: no IMAP/POP on the free tier, so it works in Zoho's
webmail and Zoho's own mobile app but not in Apple Mail.

Start with A. Move to B if you want replies to look right.

---

## Step 4 — Put the site online (free, ~5 minutes)

**Already done:** the repository `thaye712-ship-it/tallietales-site` exists, it is
public, and `index.html`, `support.html`, and `privacy.html` are committed to it.
You do not need to create a repo or drag files in.

GitHub Pages is switched on and serves the **`live-website`** branch:

1. **github.com/thaye712-ship-it/tallietales-site** → **Settings** → **Pages**.
2. Source: **Deploy from a branch**. Branch: **`live-website`**, folder
   **`/ (root)`**. Whatever is on that branch is the public site; nothing on any
   other branch is visible to anyone.
3. To publish a change: merge it into `live-website` (or edit the file on that
   branch directly on github.com and commit).
4. Wait 1–2 minutes. The site is live at:

   ```
   https://thaye712-ship-it.github.io/tallietales-site/
   ```

That URL is enough to start Apple enrollment against if the domain is not ready
yet, though Apple prefers a site on a domain you own — so do Step 2 as well.

5. Once the domain exists and its DNS records are set, come back to this screen.
   Under **Custom domain**, type `tallietales.com` → **Save**.
6. Wait for the DNS check to pass, then tick **Enforce HTTPS**. This can take up
   to an hour. Do not skip it — Apple will follow the link, and a certificate
   warning is a bad first impression.

Final URLs once the domain is attached:

```
https://tallietales.com/
https://tallietales.com/support.html
https://tallietales.com/privacy.html
```

> **Branch history.** The site was first published from `claude/basic-website-b4flaw`,
> the branch the first session happened to create. `live-website` was created from the
> same history on 2026-09-09 so the name says what it is. The old branch is kept only
> until Settings → Pages has been switched to `live-website`; after that it can be
> deleted.

**To change anything later:** open the file on github.com, click the pencil icon,
edit, and click Commit. The live site updates in about a minute.

---

## Step 5 — Enroll with Apple ($99/yr)

At **developer.apple.com/programs/enroll**, choose **Company / Organization** and supply:

- Legal entity name: `Tallie Tales LLC` (exactly as on your formation documents)
- D-U-N-S number: from Step 1
- Website: `https://tallietales.com`
- Work email: `piledrivingapp@tallietales.com` (or another address at your domain)
- Confirmation that you have authority to bind the LLC to agreements

Apple verifies by phone using the number attached to your D&B record — make sure that
number is current and that you'll answer it.

---

## Step 6 — Paste the URLs into App Store Connect

When you create the app listing:

- **Support URL** → `https://tallietales.com/support.html`
- **Privacy Policy URL** → `https://tallietales.com/privacy.html`
- **Marketing URL** (optional) → `https://tallietales.com/`

In **App Privacy**, select **Data Not Collected**. That answer must match what the app
actually does — if you later add analytics or a crash reporter, both the label and
`privacy.html` have to change.

---

## Before you submit — check these

The pages now describe the real app, including the microphone. Confirm each of
these against the finished build:

- [ ] **Microphone purpose string.** The app must declare
      `NSMicrophoneUsageDescription` in Info.plist, and the wording should match
      what the site says — that it listens to the hammer to count blows and time
      the stroke, and never records. A missing or vague purpose string is a
      routine rejection.
- [ ] **App Privacy answers.** "Data Not Collected" still holds *only* because
      audio is analysed on device and never stored or transmitted. If any
      analytics, crash reporter, or audio upload is ever added, both the App
      Privacy label and `privacy.html` must change together.
- [ ] **Beta forms.** `support.html` says agency forms other than UDOT and Plain
      are marked beta in the picker. Make sure the app actually marks them that
      way, or reword the page.
- [ ] **Version number location.** `support.html` says Setup tab → Device → Version.
- [ ] **Pricing.** `index.html` and `support.html` state $49.99 for the app with 5
      pile exports a month, and Pro at $14.99/mo or $119.99/yr with a $44.99 first
      year. These must match the App Store Connect price tier, the subscription
      products and the introductory offer, and the app's own paywall.
- [ ] **Promoter discount.** Both pages invite promoters to email for a discount;
      the package itself (a promo code plus an offer code) only exists once the
      app is live and the codes are generated in App Store Connect.
- [ ] **Hammer catalog count.** `index.html` claims more than 250 hammers. Check
      the shipped number.
- [ ] **Support email route exists.** All three pages print
      `piledrivingapp@tallietales.com`. This address must be created as a route in
      Cloudflare → Email → Email Routing; renaming it on the site does not create
      the mailbox. Until that route exists, mail to it bounces — including
      Apple's verification.
- [ ] **Email actually works.** Send a test message to that address and confirm it
      arrives before you submit.

---

## Ongoing cost

| Item | Cost |
|---|---|
| Apple Developer Program (Organization) | $99/yr |
| Domain | ~$10–12/yr |
| GitHub Pages hosting | $0 |
| Cloudflare DNS + email forwarding | $0 |
| HTTPS certificate | $0 |
| **Total** | **~$110/yr** |

The only way to go cheaper is to enroll as an individual instead — that drops the domain
and lets you use a Gmail address, but the App Store then lists your personal legal name as
the seller instead of Tallie Tales LLC.
