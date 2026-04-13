# Repository Guidelines

## Project Structure & Module Organization
This repo is a static landing page for No Added Sugar, a software studio. Keep the site lean, clear, and idea-first.

- `index.html`: page structure, external CDN dependencies, and meta tags.
- `style.css`: visual system, layout, theme CSS variables, and responsive behavior.
- `app.js`: client-side interactions - theme toggle, Leaflet map, type animation, project carousel.
- `projects-data.js`: project data loaded via `window.PROJECTS` for the carousel.
- `asset/`: icons (SVG/PNG), logos, and project screenshots.

Add new assets to `asset/` and reference them with relative paths like `asset/example.svg`.

## Environment & Development Commands

### Setup
No dependencies or build step required. This is plain HTML, CSS, and JavaScript.

### Running Locally
```bash
python3 -m http.server 8000  # Serve from repo root
open http://localhost:8000      # Open in browser (macOS)
```

### Linting & Type Checking
No automated linting or type checking is configured for this project.

### Testing
No automated tests exist. Manual verification required:

```bash
# Full manual test checklist:
# 1. Load http://localhost:8000 in browser
# 2. Test theme toggle (click sun/moon icon)
# 3. Verify Leaflet map loads with marker at Skopje
# 4. Test project carousel (prev/next buttons work)
# 5. Verify contact form renders all fields
# 6. Check responsive at 320px, 768px, 1100px widths
# 7. Verify all assets load (check network tab for 404s)
```

## Coding Style

### HTML (index.html)
- Use 2-space indentation.
- Include `lang`, `viewport`, `description`, and Open Graph meta tags.
- Add ARIA attributes for accessibility (`aria-label`, `aria-hidden`, `role`).
- Place scripts at end of body (Leaflet first, then data, then app.js).
- Use double quotes for all attribute values.

### CSS (style.css)
- Use 2-space indentation.
- Define CSS custom properties in `:root` for defaults.
- Define light theme overrides in `body.light` using CSS variable cascade.
- Use lowercase, hyphenated class names: `.project-screen-frame`, `.contact-layout`.
- Use BEM-ish naming for component blocks: `.block`, `.block-element`, `.block--modifier`.
- Use `clamp()`, `min()`, `max()` for responsive values.
- Use `gap` for flex/grid spacing instead of margins where possible.
- Include smooth transitions on interactive elements (`transform`, `opacity`, `background`).

### JavaScript (app.js)
- Keep it vanilla and simple - no frameworks.
- Use double quotes for all strings.
- Use `var` (not `const`/`let`) to match existing style.
- No semicolons at statement ends.
- Use IIFE via `document.addEventListener("DOMContentLoaded", function () { ... })`.
- Check DOM existence before attaching listeners: `if (element) { ... }`.
- Use `localStorage` for persisted state (theme preference).
- Use `requestAnimationFrame` for animations.

### Asset Naming
- Use lowercase, hyphenated names: `no_sugar_added_icon.svg`, `left_button.svg`.
- Include SVGs as inline or referenced assets.
- Optimize PNGs for web (use compression tools).

## Accessibility Requirements
- All interactive elements must have focus states.
- Include `aria-label` on icons, buttons without text, and regions.
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`).
- Ensure sufficient color contrast for text on backgrounds.
- Map must have `aria-label` or be decorative.

## Responsive Behavior
- Test at mobile (320-480px), tablet (768px), and desktop (1100px+).
- Use `clamp()` for font sizes: `font-size: clamp(1.5rem, 3vw, 2.5rem);`.
- Use CSS grid with `minmax()` for flexible columns.
- Ensure touch targets are at least 44x44px on mobile.

## Error Handling
- No error boundaries needed for this static site.
- Check for null/undefined before accessing DOM elements.
- Use `Array.isArray()` before using array methods on external data.
- Project data fallback: `var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];`

## Commit & Pull Request Guidelines

### Commit Messages
Use short, imperative messages:
- `Refine hero copy`
- `Adjust contact section spacing`
- `Add new project to carousel`

### Pull Requests
Include:
- Short summary of the change
- Screenshots for visual updates
- Manual test notes
- Linked task or issue when relevant
