# Natecleans — static landing page

Mobile-first marketing site for **Natecleans** (UK **window cleaning & gutter clearing**, plus fascias and solar). Plain HTML, CSS and JavaScript — no build step. Sister page: **Cindy Cleans** (Los Angeles solar panel cleaning only).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Natecleans UK site (hero, services, areas, gallery, enquiry) |
| `los-angeles.html` | **Cindy Cleans** — solar panel cleaning in Los Angeles / Greater LA |
| `thanks.html` | Post-submit thank-you (Natecleans) |
| `thanks-la.html` | Post-submit thank-you (Cindy Cleans) |
| `styles.css` | Mobile-first styles (sky blue / navy) |
| `images/` | Optimised UK work photos (JPG + WebP) — Natecleans gallery only |
| `script.js` | Client form validation + UK gallery lightbox |
| `favicon.svg` | Favicon |
| `robots.txt` | Allow all crawlers |

## Preview locally

```bash
cd /workspace/natecleans
python3 -m http.server 8080
```

Open http://localhost:8080

## Enquiry forms (Netlify Forms)

Both forms use **Netlify Forms** (FormSubmit removed). Submissions land in the Netlify site dashboard and can email the business.

| Page | Form `name` | Success page |
|------|-------------|--------------|
| `index.html` | `natecleans-enquiry` | `/thanks.html` |
| `los-angeles.html` | `cindy-cleans-enquiry` | `/thanks-la.html` |

Each form has: `method="POST"`, `data-netlify="true"`, unique `name`, hidden `form-name`, honeypot `bot-field`, plus `name` / `phone` / `address` / `message`.

`script.js` validates on the client; after Netlify accepts the POST, the visitor is redirected to the thanks page.

### Email notifications

Point form notifications to **ncdwindowcleaning@gmail.com** for both forms.

**Via Netlify UI (reliable fallback):**

1. Site → **Forms** → open `natecleans-enquiry` or `cindy-cleans-enquiry`
2. **Form notifications** → **Email notification**
3. Recipient: `ncdwindowcleaning@gmail.com` → save

**Via API** (used at deploy time when `NETLIFY_AUTH_TOKEN` is available): create hooks with `type: "email"`, `event: "submission_created"`, and `data.email` set to that address for each form ID. Never commit the token.

Note: the site previously had `processing_settings.ignore_html_forms: true`, which blocks form detection — it must stay **false** (Forms enabled) or Netlify will not register forms on deploy.

Netlify registers forms by scanning HTML on deploy — run a production deploy before expecting submissions.

## UK photo gallery

Natecleans only: full portraits (`object-fit: contain`), click-to-lightbox (Esc / backdrop closes). Core services lead with window cleaning, then gutter clearing. **No UK photos on Cindy Cleans.**

## Deploy

```bash
git add -A && git commit -m "…" && git push
netlify deploy --prod
```

Live: https://gleaming-sherbet-4d46ee.netlify.app/

## Contact

- Phone: **07805 273715** (`tel:+447805273715`)
- Email: **ncdwindowcleaning@gmail.com**

## Cindy Cleans

Solar panel cleaning only — form + email, no phone, no UK gallery.  
https://gleaming-sherbet-4d46ee.netlify.app/los-angeles.html
