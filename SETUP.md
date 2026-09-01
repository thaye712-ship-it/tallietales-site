# Tallie Tales LLC website — setup guide

Three HTML files that satisfy Apple's requirements for an **Organization** developer account.
No coding required. Total cost: **$99/yr Apple + about $10–12/yr for a domain.** Hosting is free.

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

## Step 2 — Buy the domain (~$10–12/yr)

Register **tallietales.com** (or the closest available variation).

- **Cloudflare Registrar** sells at cost with no first-year gimmick pricing and no upsells.
- **Porkbun** is comparable and slightly easier if you've never used Cloudflare.

Avoid registrars advertising a $1 first year — the renewal is where they make it back.

Whichever you pick, **turn off** any offer for hosting, website builder, or email hosting.
You need the domain name only.

> If you buy elsewhere, still create a free Cloudflare account and point the domain's
> nameservers at Cloudflare — that's what makes the free email forwarding in Step 3 work.

### Set the DNS records

In Cloudflare → your domain → **DNS**, add these (this is what points your domain at GitHub):

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** (grey cloud) |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |
| CNAME | `www` | `YOURUSERNAME.github.io` | **DNS only** |

The grey cloud matters. If the orange proxy cloud is on, GitHub can't issue your HTTPS
certificate and the site will show a security warning.

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

## Step 4 — Put the site online (free, ~10 minutes)

1. Create a free account at **github.com** if you don't have one.
2. Click **+** (top right) → **New repository**.
   - Name it `tallietales-site`
   - Set it to **Public** (required for free GitHub Pages)
   - Click **Create repository**
3. On the new repo page, click **uploading an existing file**.
4. Drag in `index.html`, `support.html`, and `privacy.html`. Click **Commit changes**.
5. Go to **Settings** (top of the repo) → **Pages** (left sidebar).
   - Under *Source*, choose **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → **Save**
6. Wait 1–2 minutes. Your site is live at `https://YOURUSERNAME.github.io/tallietales-site/`
7. Still on the Pages screen, under **Custom domain**, type `tallietales.com` → **Save**.
8. Wait for the DNS check to pass, then tick **Enforce HTTPS**. This can take up to an hour.

Your final URLs:

```
https://tallietales.com/
https://tallietales.com/support.html
https://tallietales.com/privacy.html
```

**To change anything later:** open the file on github.com, click the pencil icon, edit,
click Commit. The live site updates in about a minute.

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
