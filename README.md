# Natecleans — static landing page

Mobile-first marketing site for **Natecleans** (UK window & exterior cleaning). Plain HTML, CSS and JavaScript — no build step.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page site (hero, services, areas, CTA, enquiry form, footer) |
| `styles.css` | Mobile-first styles (sky blue / navy) |
| `los-angeles.html` | US landing page — solar panel cleaning in Los Angeles / Greater LA (form-only contact, no phone) |
| `script.js` | Client-side form validation + `#thanks` thank-you message |
| `favicon.svg` | Simple branded favicon |
| `robots.txt` | Allow all crawlers |

## Preview locally

From this folder:

```bash
cd /workspace/natecleans
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Enquiry form (FormSubmit)

The form POSTs to:

`https://formsubmit.co/ncdwindowcleaning@gmail.com`

Hidden fields:

- `_subject` — `Natecleans website enquiry`
- `_template` — `table`
- `_next` — set by JavaScript to the current page URL + `#thanks`
- `_honey` — honeypot (hidden with CSS) for basic spam filtering

### One-time activation (required)

**FormSubmit will not deliver enquiries until the owner confirms the first submission.**

1. Submit a real test enquiry from the live (or local) form once.
2. Check **ncdwindowcleaning@gmail.com** for FormSubmit’s confirmation email.
3. Click the confirmation link in that email.
4. Later submissions will arrive as normal emails.

Until confirmation succeeds, FormSubmit may show an activation page instead of redirecting to `#thanks`.

## Thank-you behaviour

After a successful submit, FormSubmit redirects to `index.html#thanks`. The script shows a thank-you message and hides the form.

## Deploy (static hosting)

Upload the contents of this folder (no build) to any static host:

- **Netlify** — drag-and-drop the folder, or connect a Git repo; publish directory = site root
- **Cloudflare Pages** — upload assets or connect Git; build command empty, output = `/`
- **GitHub Pages** — push these files and enable Pages on the branch/folder

After deploy, update the optional `canonical` / Open Graph URLs in `index.html` to your real domain, and set `_next` still works via the script (it uses the current origin).

## Contact details (do not invent extras)

- Phone (display): **07805 273715**
- Tel link: `tel:+447805273715`
- Enquiries: **ncdwindowcleaning@gmail.com**

## Licence / notes

Business content is for Natecleans. No secrets or API keys are stored in this repo.


Published for Google Business Profile.

## Los Angeles page

`los-angeles.html` is a separate US English landing page focused on **solar panel cleaning** in Los Angeles and Greater LA.

- Contact is **form + email only** (no phone number on that page).
- Form subject: `Natecleans Los Angeles solar enquiry`
- Same FormSubmit endpoint and validation script as the UK homepage.
- Live URL: https://gleaming-sherbet-4d46ee.netlify.app/los-angeles.html

