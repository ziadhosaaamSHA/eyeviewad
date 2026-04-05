# Skills Readiness Guide

This workspace ships with a canonical skills library at:

- `.github/.agents/skills/`

Compatibility mirrors are now supported and can be prepared automatically:

- `.agents/skills/`
- `.windsurf/skills/`
- `.trae/skills/`

## Quick prepare

Run this once (or anytime skills change):

- `npm run skills:prepare`

What it does:

1. Syncs all canonical skills to the three mirror folders.
2. Generates/updates `skills-lock.json`.
3. Validates `SKILL.md` presence + frontmatter name consistency in canonical and mirrors.

## Skill groups

### Marketing skills

`ab-test-setup`, `ad-creative`, `ai-seo`, `analytics-tracking`, `churn-prevention`, `cold-email`, `competitor-alternatives`, `content-strategy`, `copy-editing`, `copywriting`, `customer-research`, `email-sequence`, `form-cro`, `free-tool-strategy`, `launch-strategy`, `lead-magnets`, `marketing-ideas`, `marketing-psychology`, `onboarding-cro`, `page-cro`, `paid-ads`, `paywall-upgrade-cro`, `popup-cro`, `pricing-strategy`, `product-marketing-context`, `programmatic-seo`, `referral-program`, `revops`, `sales-enablement`, `seo-audit`, `signup-flow-cro`, `social-content`.

### Design skills

`eyeview-branding`, `ui-ux-pro-max`, `web-design-guidelines`.

### Development-aligned skills

`site-architecture`, `schema-markup`.

## Validation-only mode

To verify readiness without modifying mirrors:

- `npm run skills:validate`

## Notes

- Canonical source of truth is always `.github/.agents/skills/`.
- Mirrors are generated from canonical and should not be edited directly.
- `skills-lock.json` is maintained as the workspace-level integration manifest.
- For EyeView website work, always apply `eyeview-branding` first, then layer task-specific skills.
