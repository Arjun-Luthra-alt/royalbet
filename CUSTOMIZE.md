# RoyalBet — Customization Reference

> **The single file you need to edit is `js/config.js`.**  
> All values listed below are driven from that one file. No need to search through HTML files.

---

## How It Works

Every placeholder value in the site has a `data-config="key"` attribute in the HTML.  
When the page loads, `js/main.js` reads `js/config.js` and injects the real values automatically.

---

## Config File: `js/config.js`

### Brand
| Config Key     | Default Value         | What It Affects                        |
|----------------|-----------------------|----------------------------------------|
| `siteName`     | `RoyalBet`            | Site name in titles and headings       |
| `tagline`      | `India's #1 Trusted...` | Hero subtitle                        |
| `logo`         | `assets/images/royalbet_logo_...png` | Logo on all pages    |
| `copyright`    | `RoyalBet`            | Footer copyright line on all pages     |
| `footerDisclaimer` | `Warning: Gambling...` | Footer legal disclaimer            |

### Contact Details
| Config Key      | Default Value             | What It Affects                        |
|-----------------|---------------------------|----------------------------------------|
| `whatsapp`      | `+91 98765 43210`         | Displayed number in footer & contact page |
| `whatsappLink`  | `https://wa.me/91...`     | href of all "Get ID" / "WhatsApp" buttons |
| `email`         | `support@royalbet.com`    | Footer contact, contact page           |

> **To update WhatsApp:** Set `whatsappLink` to `https://wa.me/<countrycode><number>` (no spaces or `+`).  
> Example: For +91 98765 43210 → `https://wa.me/919876543210`

### Social Media
| Config Key              | Default | What It Affects                   |
|-------------------------|---------|-----------------------------------|
| `social.facebook`       | `#`     | Facebook icon link in footer      |
| `social.instagram`      | `#`     | Instagram icon link in footer     |
| `social.telegram`       | `#`     | Telegram icon link in footer      |
| `social.twitter`        | `#`     | Twitter/X icon link in footer     |

### Stats / Trust Badges
| Config Key              | Default   | What It Affects         |
|-------------------------|-----------|-------------------------|
| `stats.users`           | `500K+`   | "Users" badge on homepage |
| `stats.withdrawalTime`  | `2 Minutes` | Withdrawal badge       |
| `stats.yearsActive`     | `5+`      | Years badge             |

### Partners
| Config Key              | Default              | What It Affects                        |
|-------------------------|----------------------|----------------------------------------|
| `partners[0].name`      | `Sky Exchange`       | Partner name on Partners page          |
| `partners[0].demoId`    | `demo123`            | Demo credentials shown on homepage     |
| `partners[0].demoPass`  | `123456`             | Demo credentials shown on homepage     |
| `partners[1]...`        | Lotus Exchange       | Second partner card                    |
| `partners[2]...`        | Diamond Exchange     | Third partner card                     |

### Promotions
Update the `promos` array in `config.js` to change offer titles, descriptions, and styles on the homepage.

---

## Files Overview

```
d:\gamingwebsite\
├── js/config.js        ← ⭐ EDIT THIS FILE to change all placeholders
├── js/main.js          ← reads config.js; do not edit placeholders here
├── index.html          ← Homepage
├── about.html          ← About Us page
├── partners.html       ← Partners page
├── blog.html           ← Blog page
└── contact.html        ← Contact page
```

---

## Replacing the Logo

1. Add your new logo image to `assets/images/`
2. Update `logo` in `js/config.js` to the new filename  
   Example: `logo: "assets/images/my_new_logo.png"`

---

## Theme

The site defaults to **dark mode**. Users can toggle between dark and light using the ☀️/🌙 button in the nav bar. The preference is saved in browser `localStorage`.

To change the **default** theme, update the fallback in `main.js`:
```js
// Change 'dark' to 'light' to make light mode the default
const currentTheme = localStorage.getItem('theme') || 'dark';
```
