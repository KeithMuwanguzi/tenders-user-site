# TenderLab Deployment Guide

## Migrating tenderlab.co.uk from WordPress to Next.js (Vercel)

### Current Setup
- **Domain:** tenderlab.co.uk (registered at GoDaddy)
- **Current site:** WordPress (to be replaced)
- **New site:** Next.js on Vercel at `tenders-user-site.vercel.app`
- **CDN/Security:** Cloudflare

---

## Phase 1: Prepare Vercel for the Custom Domain

### Step 1 — Add custom domain in Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project **tenders-user-site**
3. Go to **Settings → Domains**
4. Add `tenderlab.co.uk`
5. Also add `www.tenderlab.co.uk`
6. Vercel will show you DNS records to configure — **don't use these directly** since we'll route through Cloudflare

---

## Phase 2: Set Up Cloudflare

### Step 2 — Add your domain to Cloudflare
1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Add a Site** → enter `tenderlab.co.uk`
3. Select the **Free plan** (sufficient for what we need)
4. Cloudflare will scan existing DNS records — let it finish

### Step 3 — Point GoDaddy nameservers to Cloudflare
1. Cloudflare will give you two nameservers, e.g.:
   - `anna.ns.cloudflare.com`
   - `bob.ns.cloudflare.com`
2. Go to [GoDaddy DNS Management](https://dcc.godaddy.com) for tenderlab.co.uk
3. Under **Nameservers**, click **Change** → **Enter my own nameservers**
4. Replace existing nameservers with the two Cloudflare ones
5. Save — propagation takes 10 minutes to 48 hours (usually under 1 hour)

### Step 4 — Configure DNS records in Cloudflare
Once nameservers are active, set up DNS in Cloudflare:

| Type  | Name              | Content              | Proxy  |
|-------|-------------------|----------------------|--------|
| CNAME | `@` (root)        | `cname.vercel-dns.com` | ☁️ Proxied |
| CNAME | `www`             | `cname.vercel-dns.com` | ☁️ Proxied |

> **Important:** Set both records to **Proxied** (orange cloud) so traffic flows through Cloudflare.

### Step 5 — Disable Cloudflare's forced SSL temporarily
While Vercel provisions its SSL certificate:
1. In Cloudflare → **SSL/TLS** → set mode to **Full (strict)**
2. This ensures end-to-end encryption: Visitor → Cloudflare → Vercel (all HTTPS)

---

## Phase 3: Remove WordPress

### Step 6 — Take down the old WordPress site
Once DNS is pointing to Cloudflare → Vercel and your new site loads correctly:
1. Cancel/delete your WordPress hosting (GoDaddy hosting, or wherever WP is hosted)
2. If WP was on GoDaddy hosting, you can cancel that hosting plan — the domain stays registered regardless
3. Keep a backup of any content you still need (images, blog posts, etc.)

---

## Phase 4: Cloudflare SEO & Performance Setup

### Step 7 — SSL/TLS settings
- **SSL/TLS → Overview:** Set to **Full (strict)**
- **SSL/TLS → Edge Certificates:** Enable **Always Use HTTPS**
- **SSL/TLS → Edge Certificates:** Enable **Automatic HTTPS Rewrites**
- **SSL/TLS → Edge Certificates:** Set **Minimum TLS Version** to `TLS 1.2`

### Step 8 — Speed & caching
- **Speed → Optimization:**
  - Enable **Auto Minify** (HTML, CSS, JS)
  - Enable **Brotli** compression
  - Enable **Early Hints** (103 responses for faster page loads)
  - Enable **Rocket Loader** — *test this; disable if it breaks React hydration*
- **Caching → Configuration:**
  - Set **Browser Cache TTL** to **1 month**
  - Enable **Always Online** (serves cached pages if Vercel has downtime)
- **Caching → Cache Rules:** Create a rule for static assets:
  - Match: `*.js`, `*.css`, `*.png`, `*.jpg`, `*.svg`, `*.woff2`
  - Set Edge TTL: 1 year
  - Set Browser TTL: 1 year

### Step 9 — SEO-critical redirects
Under **Rules → Redirect Rules**, create:

1. **www → non-www** (pick one canonical domain):
   - If incoming URL matches: `www.tenderlab.co.uk/*`
   - Redirect to: `https://tenderlab.co.uk/${1}`
   - Type: **301 (permanent)**

2. **HTTP → HTTPS** (handled by "Always Use HTTPS" above, but belt-and-braces):
   - Already covered by Step 7

### Step 10 — Security headers (SEO + security)
Under **Rules → Transform Rules → Modify Response Header**, add:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

### Step 11 — Bot & crawler management
- **Security → Bots:** Enable **Bot Fight Mode** (blocks bad bots, allows search engines)
- **Scrape Shield:** Enable **Email Address Obfuscation** (hides emails from scrapers)

### Step 12 — Page Rules (optional performance boost)
Create a page rule for `tenderlab.co.uk/images/*`:
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 month

---

## Phase 5: SEO Checklist After Go-Live

### Step 13 — Verify in Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property `https://tenderlab.co.uk`
3. Verify via DNS TXT record in Cloudflare:
   - Type: `TXT`
   - Name: `@`
   - Content: (the verification string Google gives you)
4. Submit your sitemap: `https://tenderlab.co.uk/sitemap.xml`

### Step 14 — Set up XML sitemap
Ensure your Next.js project generates a sitemap. Add to your project:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tenderlab.co.uk'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/care-settings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tenders`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/score-my-response`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
```

### Step 15 — Add robots.txt

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://tenderlab.co.uk/sitemap.xml',
  }
}
```

### Step 16 — 301 redirects for old WordPress URLs
If your old WordPress site had pages at different paths (e.g. `/about-us/`, `/our-services/`), add redirects in `next.config.js`:

```js
// next.config.js (or .ts)
module.exports = {
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      // Add more old WP paths as needed
    ]
  },
}
```

### Step 17 — Cloudflare Analytics
- Enable **Web Analytics** in Cloudflare (free, privacy-friendly, no JS tag needed when proxied)
- Alternatively, add the Cloudflare analytics JS snippet for client-side metrics

---

## Phase 6: Final Verification Checklist

| Check | How |
|-------|-----|
| `https://tenderlab.co.uk` loads the Next.js site | Browser |
| `http://tenderlab.co.uk` redirects to HTTPS | Browser |
| `www.tenderlab.co.uk` redirects to non-www | Browser |
| SSL certificate shows valid (Cloudflare edge + Vercel origin) | Browser padlock |
| No mixed content warnings | DevTools console |
| Google Search Console verified | GSC dashboard |
| Sitemap accessible at `/sitemap.xml` | Browser |
| Robots.txt accessible at `/robots.txt` | Browser |
| Old WordPress URLs 301 → new paths | `curl -I old-url` |
| Page speed: aim for 90+ on Lighthouse | Chrome DevTools |
| Cloudflare caching headers present on assets | DevTools Network tab |

---

## Timeline

| Step | Duration |
|------|----------|
| Vercel domain setup | 5 minutes |
| Cloudflare setup + GoDaddy nameserver change | 15 minutes |
| DNS propagation | 10 min – 48 hours |
| Cloudflare optimization rules | 20 minutes |
| SEO setup (GSC, sitemap, robots) | 15 minutes |
| WordPress teardown | 5 minutes |
| **Total active work** | **~1 hour** |

---

## Rollback Plan
If something goes wrong:
1. In Cloudflare DNS, change the CNAME records back to your old WordPress host IP
2. Or in GoDaddy, revert nameservers to the original GoDaddy ones
3. Your old site will come back within minutes
