# UI Redesign & Enterprise Design System: TRACE Portal

## 1. Overview
This redesign transforms the front-end presentation of **TRACE** (Coal India Limited Enterprise Portal) from a generic SaaS template into an authentic, credible, high-contrast, government-grade institutional application.

---

## 2. File-by-File Changes

### `templates/login.html`
- **Design System & Visual Styling**:
  - Replaced the dark navy background, glowing cyan accents, glassmorphism, and 3D gradient ribbon with a clean, flat, light-themed institutional palette (`#f8fafc` background, `#ffffff` surface cards, `1px` neutral borders).
  - Implemented strict semantic status tokens: Green for active live nodes (`#15803d` / `#f0fdf4`), Amber for notices (`#92400e`), Red for authentication errors (`#991b1b`). Eliminated decorative cyan, purple, and neon gradients.
  - Replaced Google fonts with **Inter** and **Noto Sans Devanagari** for crisp Latin and authentic Hindi typography.
  - Formatted spacing with a consistent `4px` / `8px` grid and `6px` / `8px` corner radiuses.
  - Enforced WCAG 2.1 AA compliance: contrast ratios exceeding 4.5:1, explicit 2px focus rings (`:focus-visible`), form label associations (`for` + `id`), `aria-label` / `aria-required`, and `@media (prefers-reduced-motion)`.

- **Shared Header & Footer**:
  - **Header**: Added slim top bar with standalone vector SVG wordmark for **TRACE** (`Track. Analyze. Act.`), separated Coal India Limited enterprise entity labeling, a dynamic bilingual language switcher (**English / हिन्दी**), and an accessible Help modal.
  - **Footer**: Added quiet institutional footer with SIH 2026 attribution, app version (`v2.0.0`), Support & Accessibility links, and a marked placeholder slot for government emblem authorization.

- **Page 1: Subsidiary Directory Selection (`#screenPortal`)**:
  - Transformed the card grid into a structured directory table with explicit columns: `Code`, `Subsidiary Name`, `Headquarters`, `Status`, `Action`.
  - Highlighted **Central Coalfields Limited (CCL)** with `Live (demo)` status and direct `Access Portal` primary action button.
  - Grouped non-live producing subsidiaries (BCCL, ECL, MCL, NCL, SECL, WCL) under `Coal-producing subsidiaries (7)` with muted `Not onboarded in demo` badges and accessible `Details` actions.
  - Grouped **CMPDIL** under a dedicated section: `Planning and design institute (1)`.
  - Added a plain-language summary banner covering 3 core factual modules: Dispatch Monitoring, Weighbridge Telemetry, and Mine Surveillance (no invented statistics).

- **Page 2: Officer Authentication (`#screenLogin`)**:
  - Restructured into a centered `440px` card with a top subsidiary breadcrumb and `Change subsidiary` return link.
  - Replaced five arbitrary role buttons with a clean, labeled dropdown: `Role (demo testing)` that synchronizes corresponding credentials.
  - Relocated demo quick-fill helper out of the main form into a collapsible `<details class="demo-access-disclosure">` accordion below the card.
  - Restyled the verification checkbox to a standard, accessible human confirmation check.
  - Added security notice: *"Authorised personnel only. Access is monitored and logged."* alongside a *"Forgot password? Contact your administrator"* link.
  - Implemented inline submission feedback (`Authenticating...`) and alert error handling (`role="alert"`).

---

## 3. Design Tokens Introduced

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--color-bg-canvas` | `#f8fafc` | Page backdrop canvas (Slate-50) |
| `--color-surface-white` | `#ffffff` | Primary card & header surface |
| `--color-surface-subtle` | `#f1f5f9` | Table header, subtle section backgrounds |
| `--color-border-subtle` | `#e2e8f0` | 1px internal dividers |
| `--color-border-default` | `#cbd5e1` | 1px input and card borders |
| `--color-text-primary` | `#0f172a` | High-contrast heading text (Slate-900) |
| `--color-text-secondary` | `#334155` | Body copy and labels (Slate-700) |
| `--color-text-muted` | `#64748b` | Subtitles, annotations (Slate-500) |
| `--color-primary` | `#1e3a8a` | Institutional Deep Navy |
| `--color-primary-interactive`| `#1d4ed8` | Primary button & active link blue |
| `--color-status-success-*` | `#15803d` / `#f0fdf4` | Semantic Live/Success indicator |
| `--color-status-warning-*` | `#92400e` / `#fffbeb` | Semantic Warning/Notice indicator |
| `--color-status-danger-*` | `#991b1b` / `#fef2f2` | Semantic Error/Alert indicator |
| `--radius-md` / `--radius-lg` | `6px` / `8px` | Subtle, disciplined corner radius |

---

## 4. Items Marked for Verification / TODO Comments

1. **Subsidiary Headquarters Locations**:
   - CCL: Ranchi, Jharkhand
   - BCCL: Dhanbad, Jharkhand
   - ECL: Sanctoria, West Bengal
   - MCL: Sambalpur, Odisha
   - NCL: Singrauli, Madhya Pradesh
   - SECL: Bilaspur, Chhattisgarh
   - WCL: Nagpur, Maharashtra
   - CMPDIL: Ranchi, Jharkhand
   - *Code Comment*: `<!-- verify before final submission -->`

2. **Role Selection in Production**:
   - *Code Comment*: `<!-- In production, the user's role is derived directly from the authenticated account -->`

3. **Captcha Placeholder**:
   - *Code Comment*: `<!-- Demo verification placeholder - integrate real enterprise captcha in production -->`

4. **Forgot Password Flow**:
   - *Code Comment*: `<!-- TODO: Integrate enterprise password self-service or admin escalation flow -->`

5. **Ministry Emblem Authorization**:
   - *Code Comment*: `<!-- Placeholder: Official Government of India / Ministry of Coal emblem authorization slot -->`

---

## 5. Deliberately Unchanged
- **Backend & Logic**: No changes made to `backend/routes/auth_routes.py`, `backend/routes/views_routes.py`, `app.py`, or any services.
- **Form Data & Auth Contract**: Maintained exact POST parameter names (`username`, `password`, `role`, `subsidiary`) and session cookie handling.
- **Remaining Screens**: Inner command center views (`index.html` and partials) were untouched as specified in scope.
