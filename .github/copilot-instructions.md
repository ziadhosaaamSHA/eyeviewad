# Copilot instructions for this repository

## What this repo is
- This repository is a **skill library** for AI agents, not a conventional app/service codebase.
- The core unit is a skill folder under `*/skills/<skill-name>/` with:
  - `SKILL.md` (behavior + triggers)
  - optional `references/` docs
  - optional `evals/evals.json`
  - optional scripts/data assets (example: `ui-ux-pro-max/scripts/*.py`, `ui-ux-pro-max/data/*.csv`).

## Big-picture structure and boundaries
- Canonical/project-scoped skills are under `.github/agents/skills/`.
- Compatibility mirrors exist under `agents/skills/`, `.windsurf/skills/`, and `.trae/skills/`.
- Root `skills-lock.json` is the source lockfile for installed skills (source repo + hash). Treat it as the integration manifest.

## Editing conventions specific to this repo
- Preserve YAML frontmatter in every `SKILL.md` (`name`, `description`, optional metadata). Keep `name` aligned with folder name.
- Keep skill docs actionable: trigger phrases, decision criteria, workflows, and references via relative Markdown links.
- When updating a skill, update related assets together (`SKILL.md` + `references/*` + `evals/evals.json` if behavior changed).
- Keep mirrored skill copies consistent across agent folders when a shared skill is intentionally duplicated.

## Evaluation and quality patterns
- `evals/evals.json` uses a stable schema: `id`, `prompt`, `expected_output`, `assertions`, `files`.
- Prefer adding/adjusting assertions when changing behavior, instead of only rewriting prose.
- Preserve existing tone and granularity in expected outputs (most skills use explicit checklist-style assertions).

## Developer workflows (discovered)
- Skills are added from external repos and tracked in lockfile (example pattern already used in this workspace):
  - `npx skills add <repo-url> --skill <skill-name>`
- For `ui-ux-pro-max`, validate search tooling locally after changes:
  - `python3 .github/agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain style`
  - `python3 .github/agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`

## Integration points
- External skill sources are declared in `skills-lock.json` (for example `coreyhaines31/marketingskills`, `nextlevelbuilder/ui-ux-pro-max-skill`).
- `ui-ux-pro-max` is data-driven: search/recommendation logic in `scripts/core.py` and `scripts/design_system.py`, backed by CSV datasets in `data/` and `data/stacks/`.

## When generating or refactoring content here
- Avoid generic software-architecture assumptions (no API/server/database unless explicitly introduced).
- Prefer small, surgical edits that preserve existing skill taxonomy and cross-links.
- Reference concrete files when proposing changes (for example `ai-seo/SKILL.md`, `seo-audit/SKILL.md`, `ui-ux-pro-max/scripts/search.py`).

---

## Working mode: how to use all available skills together

### 0) EyeView branding is mandatory (always first)
- Before using any other skill, load and apply `eyeview-branding`.
- Treat `eyeview-branding` as the baseline constraint system for colors, typography, headings, spacing rhythm, and section layout.
- Then layer task-specific skills on top (for example `ui-ux-pro-max`, `page-cro`, `copywriting`) without violating brand rules.

### 1) Always start with skill readiness
Run this before heavy editing sessions:

- `npm run skills:prepare`

This will:
1. Sync canonical skills to all mirrors.
2. Refresh `skills-lock.json`.
3. Validate structural consistency.

If you only want checks without syncing:

- `npm run skills:validate`

### 2) Skill selection by intent
Use this routing logic while working:

- **Marketing growth strategy** → `content-strategy`, `marketing-ideas`, `marketing-psychology`, `launch-strategy`, `product-marketing-context`, `pricing-strategy`
- **Acquisition performance** → `paid-ads`, `ad-creative`, `analytics-tracking`, `revops`, `ab-test-setup`
- **Conversion optimization (CRO)** → `page-cro`, `form-cro`, `popup-cro`, `onboarding-cro`, `signup-flow-cro`, `paywall-upgrade-cro`
- **SEO system work** → `seo-audit`, `schema-markup`, `programmatic-seo`, `site-architecture`, `ai-seo`, `competitor-alternatives`
- **Lifecycle and retention** → `email-sequence`, `lead-magnets`, `referral-program`, `churn-prevention`, `sales-enablement`, `cold-email`
- **Design and UX execution** → `eyeview-branding`, `ui-ux-pro-max`, `web-design-guidelines`
- **Cross-functional research and writing quality** → `customer-research`, `copywriting`, `copy-editing`, `social-content`, `free-tool-strategy`

### 3) Full skill inventory (currently available)

#### Marketing skills
- `ab-test-setup`
- `ad-creative`
- `ai-seo`
- `analytics-tracking`
- `churn-prevention`
- `cold-email`
- `competitor-alternatives`
- `content-strategy`
- `copy-editing`
- `copywriting`
- `customer-research`
- `email-sequence`
- `form-cro`
- `free-tool-strategy`
- `launch-strategy`
- `lead-magnets`
- `marketing-ideas`
- `marketing-psychology`
- `onboarding-cro`
- `page-cro`
- `paid-ads`
- `paywall-upgrade-cro`
- `popup-cro`
- `pricing-strategy`
- `product-marketing-context`
- `programmatic-seo`
- `referral-program`
- `revops`
- `sales-enablement`
- `seo-audit`
- `signup-flow-cro`
- `social-content`

#### Design skills
- `eyeview-branding`
- `ui-ux-pro-max`
- `web-design-guidelines`

#### Development-aligned skills
- `site-architecture`
- `schema-markup`

### 4) Recommended multi-skill playbooks

#### A) Landing page revamp for conversion
1. Audit structure with `page-cro`.
2. Redesign hierarchy and visuals using `ui-ux-pro-max` + `web-design-guidelines`.
3. Rewrite messaging with `copywriting` + `copy-editing`.
4. Instrument events using `analytics-tracking`.
5. Launch experiments via `ab-test-setup`.

#### B) Paid campaign launch to booked calls
1. Define offer and angle with `product-marketing-context`.
2. Build ad system with `paid-ads` + `ad-creative`.
3. Align landing flow with `page-cro` + `form-cro`.
4. Set funnel tracking with `analytics-tracking` + `revops`.
5. Post-launch iterate with `ab-test-setup`.

#### C) SEO growth engine
1. Baseline and issues with `seo-audit`.
2. Site map and internal linking with `site-architecture`.
3. Rich results support with `schema-markup`.
4. Scale content via `programmatic-seo` + `ai-seo`.
5. Defend positioning with `competitor-alternatives`.

#### D) Retention and expansion system
1. Diagnose churn points with `churn-prevention`.
2. Improve onboarding with `onboarding-cro` + `signup-flow-cro`.
3. Build lifecycle messaging with `email-sequence`.
4. Add expansion levers through `paywall-upgrade-cro` + `referral-program`.
5. Equip sales handoff via `sales-enablement`.

### 5) UI/UX Pro Max operating notes
- Keep `ui-ux-pro-max` data and scripts in sync when editing behavior.
- Sanity-check design recommendations with:
  - `python3 .github/agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain style`
  - `python3 .github/agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`
- If stack-specific guidance is needed, use the `data/stacks/*.csv` backed routing in the script outputs.

### 6) Quality gate before finishing work
Before finalizing any skill update:
1. Confirm `SKILL.md` frontmatter and skill name alignment.
2. Ensure any changed behavior has matching `evals/evals.json` assertions.
3. Run `npm run skills:prepare`.
4. Spot-check at least one representative command (for scripted skills like `ui-ux-pro-max`).
5. Document meaningful behavior updates in PR notes / handoff notes.

### 7) Non-negotiables
- Canonical truth is `.github/.agents/skills/`.
- Mirrors are generated outputs; avoid hand-editing mirrors directly.
- Do not remove references/evals just to make a quick pass look clean.
- For EyeView UI/frontend work, always apply `eyeview-branding` first.
- Prefer explicit workflows over vague guidance in every `SKILL.md`.
