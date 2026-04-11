---
name: eyeview-branding
description: EyeView Ads brand design system and guidelines for building the landing page. Use this skill whenever working on the EyeView website, landing page, UI components, sections, layouts, styling, colors, typography, animations, or any frontend code for the EyeView Ads project. Also use when asked about brand colors, fonts, tone, spacing, heading styles, or visual feel for EyeView.
---

# EyeView Ads — Landing Page Design System

You are building the landing page for **EyeView Ads**, a bold, modern Egyptian advertising agency. Every design and code decision must reflect the brand's energy: confident, creative, fast-moving, and visually striking. This skill contains all rules for colors, typography, layout, tone, and component behavior.

---

## Brand Essence

EyeView Ads is NOT a quiet brand. It commands attention. The design should feel like:
- A confident agency that makes bold statements
- High energy — orange, red, movement
- Clean and modern — not cluttered, never chaotic
- Professional enough to be trusted, exciting enough to be remembered

**Tagline**: *"Vision Meets Growth"*  
**Hero CTA line**: *"WE MAKE PEOPLE CHOOSE YOU"*  
**Sub-tagline**: *"Online or offline, they will reach out to you no matter what"*

---

## Color Palette

Always use these exact values. Never substitute or approximate.

```css
:root {
  --color-white:        #FFFFFF;
  --color-off-white:    #FFF3E5;  /* warm background, never pure white backgrounds */
  --color-yellow:       #FCE198;  /* accent / highlight only */
  --color-orange:       #FB6900;  /* PRIMARY brand color — buttons, CTAs, icons, key text */
  --color-red:          #C2131F;  /* SECONDARY brand color — section backgrounds, accents */
  --color-dark-red:     #590000;  /* deep background sections, authority */
  --color-black:        #000000;  /* text, logo, strong contrast */
}
```

### Color Usage Rules

**DO:**
- Use `--color-orange` for all primary CTAs, active states, and brand-forward text
- Use `--color-off-white` (#FFF3E5) as the default page/section background — never plain white
- Use `--color-red` for high-contrast full-bleed section backgrounds
- Use `--color-black` as the main text color on light backgrounds
- Use `--color-white` for text on orange/red/dark-red backgrounds
- Combine orange text on off-white for the signature warm look (see hero section)
- Combine white text on orange backgrounds for buttons and banners

**DON'T:**
- Never pair orange (#FB6900) and red (#C2131F) as neighboring text/background — they clash
- Never use orange as a background for large text blocks
- Never use yellow (#FCE198) as a primary color — it's an accent only
- Never use dark-red as a text color on colored backgrounds

### Approved Combinations

| Background       | Text / Elements        | Use For                        |
|-----------------|------------------------|-------------------------------|
| `#FFF3E5`        | `#FB6900` (orange)     | Hero, main sections            |
| `#FB6900`        | `#FFFFFF` (white)      | CTA buttons, banners           |
| `#C2131F`        | `#FFFFFF` (white)      | Feature sections, full-bleed   |
| `#000000`        | `#FFF3E5` or `#FB6900` | Dark hero alternates, footers  |
| `#590000`        | `#FFF3E5` or `#FCE198` | Dark premium sections          |
| `#FFFFFF`        | `#000000`              | Clean utility content          |

---

## Typography

Three fonts in the system — each has a strict role.

### 1. Agrandir Tight — Headings & Logo
- **Role**: H1, H2, H3 headings, logo wordmark, hero statements
- **Weight**: Bold (700) for headings; Regular for subheadings
- **Style**: Use uppercase (`text-transform: uppercase`) for all major headings
- **Feel**: Loud, confident, commanding — it should fill space
- **CSS**: `font-family: 'Agrandir Tight', sans-serif;`

```css
/* Heading defaults */
h1, h2, h3 {
  font-family: 'Agrandir Tight', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.0;
}

h1 { font-size: clamp(3rem, 8vw, 7rem); }
h2 { font-size: clamp(2rem, 5vw, 4rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2.5rem); }
```

### 2. Akzidenz-Grotesk — Body & Subtitles
- **Role**: Body copy, subtitles, navigation, labels, captions
- **Weights**: Light (300), Regular (400), Medium (500), Bold (700)
- **Feel**: Clean, legible, professional — the "quiet" font that makes headings pop
- **CSS**: `font-family: 'Akzidenz-Grotesk', sans-serif;`

```css
body {
  font-family: 'Akzidenz-Grotesk', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
}

.subtitle { font-weight: 500; font-size: 1.1rem; letter-spacing: 0.05em; }
.caption  { font-weight: 300; font-size: 0.875rem; }
.nav-link { font-weight: 500; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase; }
```

### 3. Authenia Textured — Script Accents ONLY
- **Role**: Decorative script for section accents, creative highlights, stylistic "about" labels
- **Use sparingly**: One or two instances max per page — treat it like a design element, not functional text
- **Feel**: Handcrafted warmth, personal signature — contrasts beautifully with the bold sans-serifs
- **CSS**: `font-family: 'Authenia Textured', cursive;`
- **Example uses**: Section labels styled as handwritten annotations (like "About" above a content block)

---

## Layout & Spacing

### Grid
Use a 12-column grid. Major sections should be full-width with controlled inner containers.

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
}

section {
  padding: clamp(4rem, 10vw, 10rem) 0;
}
```

### Section Rhythm
Alternate section backgrounds to create visual rhythm:
1. Off-white `#FFF3E5` (hero, default)
2. Orange `#FB6900` (bold CTA, services)
3. Off-white again
4. Red `#C2131F` (feature callout)
5. Black `#000000` (footer)

Never repeat the same background color in consecutive sections.

---

## Navigation

```
Logo (left) | WORK INDEX · ABOUT US · BLOG | [GET IN TOUCH] (right, orange pill button)
```

- Navigation links: uppercase, Akzidenz-Grotesk Medium, letter-spacing 0.08em
- "GET IN TOUCH" button: orange background (#FB6900), white text, rounded pill (`border-radius: 50px`), bold
- Nav background: transparent over hero, solid `#FFF3E5` on scroll
- No underlines on nav links — use color change on hover (`#FB6900`)

---

## Hero Section

The hero is the most important section. It must be loud and immediate.

**Layout**: Off-white background, full viewport height or near-full.

```
[Navbar]

WE MAKE PEOPLE CHOOSE 👁️ YOU        ← H1, orange, all caps, huge
Online or offline, they will reach    ← subtitle, Akzidenz-Grotesk, orange, uppercase
out to you no matter what

        [HOW WE DO IT]               ← large orange pill CTA button
             ↓↓↓                     ← animated chevrons in orange
```

- H1 font size: `clamp(3.5rem, 9vw, 8rem)`, bold, Agrandir Tight
- H1 color: `#FB6900` (orange) on `#FFF3E5` (off-white background)
- Subtitle: Akzidenz-Grotesk, uppercase, `#FB6900`, letter-spacing: 0.1em
- Logo mascot (eye icon) embedded inline in the H1 text between "CHOOSE" and "YOU"
- CTA button: large, pill-shaped, orange bg, white text, generous padding (1rem 3rem)
- Scroll indicator: triple chevron `>>>` or `↓↓↓` in orange below CTA

---

## Buttons & CTAs

```css
/* Primary button */
.btn-primary {
  background-color: #FB6900;
  color: #FFFFFF;
  font-family: 'Akzidenz-Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #C2131F;
  transform: translateY(-2px);
}

/* Secondary button (on colored backgrounds) */
.btn-secondary {
  background-color: transparent;
  color: #FFFFFF;
  border: 2px solid #FFFFFF;
  /* same font/size/radius as primary */
}

.btn-secondary:hover {
  background-color: #FFFFFF;
  color: #FB6900;
}
```

Never use flat square buttons — always use the pill or rounded-rectangle (`border-radius: 8px` minimum).

---

## Key Sections & Their Design

### Services Section
- Background: `#FB6900` (orange)
- Text: `#FFFFFF`
- Layout: Grid of service cards (2–3 columns on desktop)
- Cards: slightly transparent white overlay, rounded corners

Services to feature:
1. Video Ads Production (YouTube, Facebook, Instagram, TikTok)
2. Performance Marketing (ROI-focused)
3. Creative Branding Campaigns
4. Social Media Advertising
5. Consultation and Strategy

### "Why Partner With Us?" Section
- Background: `#C2131F` (red)
- Text: `#FFFFFF`
- Headline: `"WHY PARTNER WITH US?"` in Agrandir Tight
- Subheadline: `"BECAUSE WE MAKE PEOPLE CHOOSE YOU"` — same size, bold
- Features listed below: Multi-Channel Expertise, Data-Driven Results, Experienced Team, Collaborative Spirit, Commitment to Excellence

### Target Audience Section
- Background: `#FFF3E5`
- Text: `#000000` / `#FB6900` for highlights
- Display as icon cards or a horizontal strip

Audience segments: SMEs, Startups, Established Brands, E-commerce Brands

### Stats / Social Proof Strip
- Background: `#000000` or `#590000`
- Text: `#FFF3E5` or `#FCE198` (yellow) for numbers
- Large numbers with Agrandir Tight, descriptions in Akzidenz-Grotesk Light

### Footer
- Background: `#000000`
- Text: `#FFF3E5`
- Logo in orange or white
- Links in Akzidenz-Grotesk Light, no underlines
- Contact: `+20 123 232 389 3123`, `123 Ismailia`
- Copyright: `© 2025 EYE VIEW`

---

## Logo Usage

The logo is the text wordmark: **EYEVIEWads**
- "EYEVIEW" in Agrandir Tight Bold
- "ads" in smaller, lighter weight (appears subscript/suffix style)
- A mascot icon exists: stylized eyes with a play-button smile — use as favicon, icon, and inline brand accent
- On light backgrounds: use orange logo
- On dark/colored backgrounds: use white logo
- Minimum clear space: equal to the height of the "E" in EYEVIEW on all sides

---

## Animations & Motion

The brand is energetic — motion should reflect this, but stay purposeful.

```css
/* Base transition */
* { transition: color 0.2s ease, background-color 0.2s ease; }

/* Hover lift for cards */
.card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(251, 105, 0, 0.2); }

/* Scroll-triggered fade-in */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
```

- Use scroll-triggered animations (IntersectionObserver) for section content reveal
- Hero headline can have a typewriter or stagger-in effect
- Orange elements can pulse subtly to draw attention to CTAs
- No jarring transitions — smooth easing always (`ease` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)`)

---

## Tone of Voice (for any copy you write)

- **Direct and bold**: Lead with the benefit. "WE GROW BUSINESSES." Not "We help companies grow."
- **Confident, not arrogant**: Back up every claim with energy, not empty boasting
- **Uppercase for impact**: All major headings in ALL CAPS
- **Short punchy phrases**: Prefer 3–6 word headline punches
- **First person plural**: "We", "Our", "Us" — team-oriented
- **No jargon in hero**: Save "ROI", "KPI", "conversion" for services/details sections

**Examples of on-brand copy:**
- ✅ "VISION MEETS GROWTH"
- ✅ "WE MAKE PEOPLE CHOOSE YOU"
- ✅ "WHY SETTLE FOR LESS WHEN EYE VIEW EXISTS"
- ✅ "3 STEPS TO BOOST YOUR SOCIAL MEDIA CONTENT"
- ❌ "Delivering comprehensive digital advertising solutions"
- ❌ "We leverage data-driven methodologies"

---

## Component Checklist

When building any component for EyeView, verify:

- [ ] Background color follows the approved combinations table
- [ ] Headings use Agrandir Tight, uppercase, correct size scale
- [ ] Body text uses Akzidenz-Grotesk
- [ ] Script font (Authenia) used max once or twice per page
- [ ] Primary CTA button is orange pill with white text
- [ ] No orange-on-red or red-on-orange color pairings
- [ ] Off-white (`#FFF3E5`) used instead of pure white for warm feel
- [ ] Hover states exist on all interactive elements
- [ ] Section alternates background colors — no two identical consecutive sections
- [ ] Logo clear space respected

---

## File Structure Suggestion

```
eyeview/
├── index.html
├── styles/
│   ├── tokens.css        ← CSS custom properties (colors, fonts, spacing)
│   ├── base.css          ← reset, typography defaults
│   ├── components.css    ← buttons, cards, nav
│   └── sections.css      ← hero, services, why-us, footer
├── scripts/
│   └── main.js           ← scroll animations, nav behavior
└── assets/
    ├── fonts/
    ├── logo/
    └── images/
```

Always define CSS custom properties in `tokens.css` and reference variables throughout — never hardcode color hex values outside of `tokens.css`.
