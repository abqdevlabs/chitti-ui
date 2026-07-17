---
name: Fintech Precision
colors:
  surface: "#f7f9fb"
  surface-dim: "#d8dadc"
  surface-bright: "#f7f9fb"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f2f4f6"
  surface-container: "#eceef0"
  surface-container-high: "#e6e8ea"
  surface-container-highest: "#e0e3e5"
  on-surface: "#191c1e"
  on-surface-variant: "#434656"
  inverse-surface: "#2d3133"
  inverse-on-surface: "#eff1f3"
  outline: "#737688"
  outline-variant: "#c3c5d9"
  surface-tint: "#004ced"
  primary: "#003ec7"
  on-primary: "#ffffff"
  primary-container: "#0052ff"
  on-primary-container: "#dfe3ff"
  inverse-primary: "#b7c4ff"
  secondary: "#006c49"
  on-secondary: "#ffffff"
  secondary-container: "#6cf8bb"
  on-secondary-container: "#00714d"
  tertiary: "#3f4f65"
  on-tertiary: "#ffffff"
  tertiary-container: "#57677e"
  on-tertiary-container: "#d6e6ff"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#dde1ff"
  primary-fixed-dim: "#b7c4ff"
  on-primary-fixed: "#001452"
  on-primary-fixed-variant: "#0038b6"
  secondary-fixed: "#6ffbbe"
  secondary-fixed-dim: "#4edea3"
  on-secondary-fixed: "#002113"
  on-secondary-fixed-variant: "#005236"
  tertiary-fixed: "#d3e4fe"
  tertiary-fixed-dim: "#b7c8e1"
  on-tertiary-fixed: "#0b1c30"
  on-tertiary-fixed-variant: "#38485d"
  background: "#f7f9fb"
  on-background: "#191c1e"
  surface-variant: "#e0e3e5"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered to evoke institutional trust through a lens of modern, high-velocity technology. It targets a sophisticated audience that values clarity, speed, and precision in financial transactions.

The aesthetic is **Corporate Modern** with a **Minimalist** foundation, punctuated by **Glassmorphism** for navigational overlays and high-level context. The visual narrative focuses on "clarity through depth," utilizing subtle shadows and layered surfaces to guide the user's focus without overwhelming them with decorative elements. The result is a premium, high-integrity environment that feels both secure and innovative.

## Colors

This design system utilizes a high-contrast palette optimized for readability and status signaling.

- **Primary (Deep Blue):** Used for primary actions, brand presence, and active states.
- **Secondary (Emerald Green):** Reserved for success states, positive financial trends, and secondary confirmation actions.
- **Tertiary (Slate):** Employed for iconography, secondary text, and inactive states.
- **Neutral (Slate Gray/White):** Defines the structural scaffolding.

For **Dark Mode**, the Primary Blue shifts to a slightly higher vibrance to maintain AA accessibility against the Deep Navy (#0F172A) background. Surfaces in dark mode use a tonal layering system (Elevated, Base, Sunken) rather than pure black to maintain depth perception.

## Typography

Inter is the exclusive typeface for this design system, chosen for its exceptional legibility in data-heavy environments.

- **Scale:** Use a tight 1.25x (Major Third) scale for desktop and 1.2x (Minor Third) for mobile.
- **Weight:** Headers utilize Semi-Bold (600) and Bold (700) to create a strong hierarchy. Body text stays at Regular (400) for long-form reading.
- **Numbers:** When displaying currency or stock figures, use tabular numbers (tnum) to ensure vertical alignment in tables and lists.

## Layout & Spacing

The system is built on a strict **8px linear grid**. All dimensions, paddings, and margins must be multiples of 8.

- **Desktop:** 12-column fluid grid, 1280px max-width, 24px gutters.
- **Tablet:** 8-column fluid grid, 24px gutters.
- **Mobile:** 4-column fluid grid, 16px margins, 16px gutters.

Horizontal alignment is key; data tables and cards should align to the same vertical grid lines to maintain a "structured ledger" feel. Use "Negative Spacing" (tightening margins) for related data points like a currency symbol and its value.

## Elevation & Depth

Depth is created through a combination of **Ambient Shadows** and **Tonal Layers**.

- **Level 0 (Base):** Background color.
- **Level 1 (Cards/Lists):** Surface color with a 4px blur, 2% opacity black shadow.
- **Level 2 (Modals/Dropdowns):** Surface color with a 12px blur, 8% opacity black shadow.
- **Glassmorphism Layer:** Used for sticky headers and sidebars. Apply a `backdrop-filter: blur(12px)` and a 1px semi-transparent border (`white/10%` in dark, `slate/10%` in light) to simulate a physical pane of glass.

## Shapes

The shape language is approachable yet geometric.

- **Standard (8px):** Buttons, input fields, and small UI widgets.
- **Large (16px):** Content cards and container sections.
- **Extra Large (24px):** Hero sections and main dashboard containers.
- **Full (Pill):** Status chips, tags, and search bars.

Avoid sharp corners entirely to maintain the "premium software" feel established by Stripe and modern fintech benchmarks.

## Components

- **Buttons:** Primary buttons use a solid Deep Blue fill with white text. Secondary buttons use a subtle gray-wash background or a ghost-style outline.
- **Cards:** Rounded (16px), with a 1px border (#E2E8F0) and a soft Level 1 shadow. In dark mode, borders should be #1E293B.
- **Status Chips:** Small, pill-shaped components. Success uses Emerald Green with 10% background opacity; Pending uses Amber; Failed uses Rose.
- **Input Fields:** Large tap targets (min 48px height), 8px radius, with active states indicated by a 2px Primary Blue border.
- **Data Visualizations:** Line charts should use a 2px stroke width with a subtle gradient area fill. Green for positive growth, Slate for neutral/historical.
- **Progress Indicators:** Linear bars with rounded caps. Use the Primary Blue for general progress and Emerald Green for completion.
