---
name: eyeview-branding
description: Mandatory baseline brand system for all EyeView website work. Use this skill first for every UI/layout/styling/content change, then combine with task-specific skills.
---

# EyeView Branding (Mandatory)

Use this skill on **every EyeView task** before applying any other skill.

## When to trigger
- Any work in `src/app/**`, `src/components/**`, `src/lib/**`
- Any updates to copy, colors, spacing, typography, CTAs, layout rhythm, interactions, or section order
- Any request involving hero, navbar, services, FAQ, footer, or brand visuals

## Required workflow
1. Read the full branding guide in `./eyeview-branding.md`.
2. Extract constraints for:
   - color tokens and approved combinations
   - typography roles (Agrandir Tight, Akzidenz-Grotesk, Authenia)
   - heading scale and uppercase rules
   - section rhythm and layout spacing
   - CTA shape, casing, and hover states
3. Apply those constraints to implementation.
4. If another skill is needed (e.g. `ui-ux-pro-max`, `page-cro`, `copywriting`), use it **after** this one and do not violate branding constraints.

## Non-negotiables
- Always reference brand tokens from `src/app/globals.css`.
- Do not introduce off-brand colors or font substitutions.
- Keep headings bold, high-impact, and uppercase per branding rules.
- Preserve visual confidence: clear hierarchy, strong CTA visibility, and consistent spacing rhythm.

## Full reference
- `./eyeview-branding.md`
