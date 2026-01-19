# AI Coding Agent Instructions

## Project Overview
A professional portfolio website for Adv. Ashish Srivastav, a Senior Advocate & Legal Consultant. This is a static HTML/CSS/JavaScript site hosted on GitHub Pages with a dark, minimalist design emphasizing trust and professionalism.

## Architecture & Key Components

### File Organization
- **Root HTML files** ([index.html](../index.html), [about.html](../about.html), [contact.html](../contact.html), [media.html](../media.html)): Multi-page structure with consistent header/nav across all pages
- **Centralized styling** ([assets/css/style.css](../assets/css/style.css)): Single stylesheet imported by all pages (no page-specific CSS)
- **Minimal JavaScript** ([assets/js/script.js](../assets/js/script.js)): Only testimonial slider (setInterval-based carousel, ~10 lines)

### Design System
- **Color Palette**: Gold accent (#c9a24d), dark backgrounds (#0e0e11, #15151a, #0b0b0d), light text (#eaeaea)
- **Typography**: Playfair Display (serif, headings), Inter (sans-serif, body text) from Google Fonts
- **Pattern**: Section-based layout with alternating light/dark backgrounds (`.section` and `.section.dark`)
- **Responsive**: Mobile breakpoint at 768px with flex-direction changes and reduced padding

## Key Patterns & Conventions

### HTML Patterns
1. **Consistent header structure**: Logo + nav menu on all pages with active state styling
2. **Section pattern**: `.section` divs for all content blocks with `.dark` modifier for alternating backgrounds
3. **Form fields**: Contact form uses `required` attribute; email/text inputs with textarea for message
4. **Button styling**: Two button classes - `.btn-primary` (solid gold) and `.btn-outline` (gold border)
5. **Meta tags**: All pages include title, description, keywords, author, viewport (SEO-focused)

### CSS Architecture
- **Utility-first applied systematically**: `.dark`, `.active`, `.small` modifiers for component variations
- **Animations**: All `.section` and `.card` elements fade in with `fadeUp` keyframe animation (opacity + translateY)
- **Grid layout**: Auto-fit responsive grid for cards/practice areas (min 220px per column)
- **Fixed elements**: WhatsApp floating button with z-index 999 (position: fixed, bottom/right)

### JavaScript Conventions
- **DOM queries first**: Use `document.querySelectorAll()` to select elements
- **setInterval loops**: Testimonial slider uses modulo arithmetic for cycling (index = (index + 1) % length)
- **Class manipulation**: Toggle `.active` class to show/hide testimonials every 4 seconds

## Development Workflows

### No Build Process
This is a static site—no build tools, bundlers, or dev server required. Changes are immediately visible when files are refreshed in a browser.

### Testing Changes
- Open HTML files directly in a browser
- Test responsive design at 768px breakpoint
- Verify all internal links (nav menu routes to index.html, about.html, contact.html, media.html)

### Deployment
Hosted on GitHub Pages. Commit changes to the repository—no special build step needed.

## Important Integration Points

1. **Google Fonts**: External dependency in `<head>` (Playfair Display, Inter). Ensure font names match CSS font-family declarations
2. **WhatsApp Integration**: Floating button placeholder in [index.html](../index.html) (`.whatsapp-float`). Phone number field contains placeholder `+91-XXXXXXXXXX`
3. **Email/Contact Form**: Currently static HTML form without backend processing. `required` attributes are HTML5 validation only

## When Making Changes

- **CSS updates**: Ensure mobile breakpoint at 768px remains intact
- **New pages**: Duplicate header/nav structure from existing pages; import style.css
- **Colors**: Use #c9a24d for accents, #0e0e11/0b0b0d for dark backgrounds
- **Animation delays**: Default fadeUp animation is 1s ease; maintain consistency when adding new sections
- **Images**: Placeholders currently use no images. If adding images, store in `assets/images/`
- **Form fields**: Keep contact form fields simple (name, email, message) with required validation
