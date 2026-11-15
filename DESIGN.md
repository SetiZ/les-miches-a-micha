---
name: Iron & Ember Forge
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b6b5b4'
  tertiary: '#cac6c3'
  on-tertiary: '#32302f'
  tertiary-container: '#131211'
  on-tertiary-container: '#807d7b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
  fired-gold: '#D4AF37'
  ember-orange: '#E65100'
  aged-parchment: '#F5E6D3'
  iron-rim: '#4A4A4A'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1200px
---

## Brand & Style

This design system reimagines the artisanal bakery as a legendary forge of sustenance. It blends the raw, weathered aesthetics of dark fantasy RPGs (Skyrim, Conan the Barbarian) with the high-contrast, aggressive energy of metal music culture. The resulting atmosphere is one of "Bakery Core" meets "Dark Fantasy"—where a croissant isn't just pastry, but a forged artifact.

The visual narrative relies on three pillars:
- **The Obsidian Hearth:** Heavy, charcoal-to-black backgrounds that evoke ancient stone and cold iron.
- **The Alchemist’s Light:** Dramatic, high-contrast lighting where amber glows and ember oranges cut through the darkness like fire in a cavern.
- **Artisanal Brutalism:** A mix of raw, chiseled textures and sharp, forged edges, balanced by the organic "M" croissant logo which acts as a sacred mark of quality.

The target audience seeks more than bread; they seek a ritualistic experience. The UI should feel heavy, permanent, and "discovered" rather than "built."

## Colors

The palette is strictly dark and atmospheric, prioritizing high contrast to ensure legibility and dramatic flair.

- **Primary (Iron Black):** The foundation of the UI, used for deep backgrounds.
- **Secondary (Smoky Charcoal):** Used for container surfaces and "stone" cards to create depth against the black.
- **Accent (Fired Gold & Ember Orange):** These are reserved for interactive elements, status indicators ("The Hearth is Lit"), and focal points. They represent the heat of the oven.
- **Neutral (Aged Parchment):** Used exclusively for typography and fine-line iconography to mimic ink on old paper. 

Avoid using pure white; use Aged Parchment for all "light" elements to maintain the weathered, historical feel.

## Typography

The typographic system contrasts "Modern Metal" technicality with "Ancient Scroll" readability.

- **Headlines:** Use **Space Grotesk** for a chiseled, geometric, and futuristic "metal" look. It should be set with tight tracking and heavy weights.
- **Body:** Use **Source Serif 4** to provide the feeling of a classic manuscript. It offers high legibility for long descriptions of artisanal processes while maintaining a traditional aesthetic.
- **Labels:** Use **JetBrains Mono** for technical metadata (weights, Siret numbers, price) to evoke a sense of precision and etched markings.

All headings should be treated as "etched" into the UI, often paired with subtle text-shadows to mimic depth.

## Layout & Spacing

The layout follows a **fixed-grid** model that feels architectural. Content is centered, resembling the symmetrical layouts of ancient stone tablets or album covers.

- **Grid:** Content lives in centered, max-width (1200px) containers with generous 64px outer margins to focus the eye on the "artifact" (content). Sections compose their own full-width card grids (bento-style).
- **Rhythm:** Vertical spacing is aggressive. Large gaps (80px+) between sections create a sense of scale and importance.
- **Mobile:** Elements reflow into a single-column "scroll," maintaining the centered alignment and ensuring buttons remain full-width for a "heavy" feel.

## Elevation & Depth

This design system eschews modern soft shadows for **Tonal Layers and Forged Borders**.

- **Surface Tiers:** Depth is achieved by stacking `Smoky Charcoal` surfaces on top of `Iron Black` backgrounds. 
- **Forged Borders:** Use 1px or 2px solid borders in `Iron Rim` (#4A4A4A) to define containers. These should look like metal frames holding stone slabs.
- **Glow States:** Instead of elevation shadows, use inner glows or outer "heat" glows (`Ember Orange`) to indicate active or hovered states.
- **Texture:** Backgrounds should utilize a subtle noise or "stone grain" texture (opacity 5-10%) to break up flat digital colors and add tactile grit.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To evoke the feeling of forged metal and hewn stone, avoid all rounded corners. Every button, input, and container must have 90-degree angles. This reinforces the "Metal" and "Brutalist" aesthetic, making the UI feel uncompromising and durable. For decorative elements, use diagonal "clipped" corners to mimic runes or chiseled stone.

Exceptions: small status badges and pills use fully rounded corners (cart count, "hearth is lit" indicators), and floating overlays such as the date picker use a slight radius — sharpness is for structural containers, buttons and cards.

## Components

### Buttons
- **Base:** Sharp corners, `Iron Black` background, `Iron Rim` border.
- **Text:** `Aged Parchment`, Uppercase, `JetBrains Mono`.
- **Hover State (outline variant):** Border and text turn `Fired Gold`, with a slight upward lift and a soft ember outer glow.
- **Hover State (filled primary variant):** Background shifts to `Fired Gold` with `Iron Black` text.

### Cards (The "Stone Slab")
- Surfaces use `Smoky Charcoal` with a subtle stone texture overlay. 
- Borders are `Iron Rim`. 
- Headers within cards are separated by a horizontal rule that looks like a forged metal line.

### Input Fields
- Transparent over the `Iron Black` surface (darker than the card they sit in).
- Full 1px border in `Iron Rim` on all sides.
- Keyboard focus shows a 2px `Fired Gold` focus-visible ring.
- Placeholder text in muted `Aged Parchment`.

### Chips / Filters
- Used for bread categories. Sharp, rectangular boxes.
- "Inactive" looks like etched stone; "Active" is filled with `Ember Orange`, bordered in `Fired Gold`, with `Aged Parchment` text.

### Navigation
- A fixed bar with the "M" logo on the left and links on the right (desktop); mobile shows the logo and cart only.
- Links are `Aged Parchment` with no underlines; hover turns them `Fired Gold`.
- The current page's link is underlined in `Fired Gold`.

### Icons
- Icons must be stroke-based, appearing hand-etched or drawn with a fine-point ink pen. Use the `Aged Parchment` color for all iconography.
