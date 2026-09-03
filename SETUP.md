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
| 4a. DNS records pointing at GitHub | **Not started** ← *next action* |
| 4b. GitHub Pages switched on | **Not started** ← *next action, 2 minutes* |
| 4c. Custom domain + HTTPS | Blocked by 4a and 4b |
| 5. Apple enrollment | Blocked by Step 1 (D-U-N-S) and 4c |
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

DNS is edited **at whoever you bought the domain from**, not at GitHub. Log in
there and look for a section called **DNS**, **DNS Records**, **Manage DNS**, or
**Advanced DNS**. Then add these five records:

| Type | Name / Host | Value / Points to | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Auto / default |
| A | `@` | `185.199.109.153` | Auto / default |
| A | `@` | `185.199.110.153` | Auto / default |
| A | `@` | `185.199.111.153` | Auto / default |
| CNAME | `www` | `thaye712-ship-it.github.io` | Auto / default |

All four A records are required — they are GitHub's four Pages servers, and using
only one costs you redundancy. `@` means the bare domain (`tallietales.com`); some
registrars want the field left blank instead, and a few want `tallietales.com`
typed out. The CNAME value must end in a dot at some registrars
(`thaye712-ship-it.github.io.`) — if the form rejects it, add the trailing dot.

**Where to click, by registrar:**

- **Cloudflare** — pick the domain → **DNS** → *Add record*. Set every record's
  proxy toggle to **DNS only (grey cloud)**. This one matters: with the orange
  proxy cloud on, GitHub cannot issue the HTTPS certificate and visitors get a
  security warning.
- **Porkbun** — **Domain Management** → the domain → **DNS** → *Add record*.
- **Namecheap** — **Domain List** → *Manage* → **Advanced DNS** → *Add New Record*.
  Delete the default "parking page" URL-redirect record if one is present, or it
  will fight the A records.
- **GoDaddy** — **My Products** → the domain → **DNS** → *Add*. Remove the default
  parked `A @` record pointing somewhere else first.
- **Squarespace / Google Domains** — the domain → **DNS** → *Custom records*.

**Delete any pre-existing `A @` record** that came with the domain. Registrars
ship a parking-page record by default, and if it stays, the domain will keep
resolving to the parking page for some visitors.

Changes usually take effect in minutes, though DNS can take up to 24 hours to
reach everywhere.

---

## Step 3 — Get email at your domain (free)

Apple will not accept a Gmail address for **organization** enrollment. You need
`something@tallietales.com`. Two free ways:

**Option A — Cloudflare Email Routing (simplest, receive-only)**

Cloudflare → your domain → **Email** → Email Routing → enable. Create a rule forwarding
`support@tallietales.com` to your Gmail. Everything lands in your normal inbox. The catch
is your replies go out from your Gmail address.

Good enough for Apple's verification and for a low-volume support inbox.

**Option B — Zoho Mail free plan (a real mailbox)**

Free for up to 5 users, 5 GB each, one custom domain. You send *and* receive as
`support@tallietales.com`. Limitation: no IMAP/POP on the free tier, so it works in Zoho's
webmail and Zoho's own mobile app but not in Apple Mail.

Start with A. Move to B if you want replies to look right.

---

## Step 4 — Put the site online (free, ~5 minutes)

**Already done:** the repository `thaye712-ship-it/tallietales-site` exists, it is
public, and `index.html`, `support.html`, and `privacy.html` are committed to it.
You do not need to create a repo or drag files in.

What is left is switching Pages on:

1. Go to **github.com/thaye712-ship-it/tallietales-site** → **Settings** (top of
   the repo) → **Pages** (left sidebar).
2. Under *Source*, choose **Deploy from a branch**.
3. Branch: **`claude/basic-website-b4flaw`** — this is the repository's default
   branch, and the one holding the site files. Folder: **`/ (root)`** → **Save**.
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

> **A note on the branch name.** `claude/basic-website-b4flaw` is an odd name for
> a permanent site, but it is only ever visible in repository settings — never in
> a URL or to a visitor. Renaming it to `main` is optional tidying; if you do
> rename it, change the branch in Settings → Pages to match or the site will go
> offline.

**To change anything later:** open the file on github.com, click the pencil icon,
edit, and click Commit. The live site updates in about a minute.

---

## Step 5 — Enroll with Apple ($99/yr)

At **developer.apple.com/programs/enroll**, choose **Company / Organization** and supply:

- Legal entity name: `Tallie Tales LLC` (exactly as on your formation documents)
- D-U-N-S number: from Step 1
- Website: `https://tallietales.com`
- Work email: `support@tallietales.com` (or another address at your domain)
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

## Before you submit — fill in these blanks

The pages are written and ready, but a few things describe an app that doesn't exist yet.
Check each one against the finished app:

- [ ] **App name.** The pages say "Drive Log" throughout. Change it everywhere if you pick
      a different name.
- [ ] **Feature list** on `index.html` — delete anything the v1 app won't ship with. Apple
      reviewers do read the support page, and describing features that aren't there invites
      questions.
- [ ] **Export.** `support.html` and `privacy.html` both say logs can be exported through the
      iOS share sheet. If v1 has no export, remove those lines.
- [ ] **Version number location.** `support.html` tells users the version is "on the app's
      settings screen." Point them wherever it actually is.
- [ ] **Support email** — the files use `support@tallietales.com`. If you use a different
      address, find and replace it in all three files.
- [ ] **Email actually works.** Send yourself a test message to the support address and
      confirm it arrives before you submit.

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
