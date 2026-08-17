# Vrindopnishad — System Design & UI/UX Architecture Specification

> **Document Version**: 2.4.0  
> **Status**: Production Reference Document  
> **Project**: Vrindopnishad Sanctuary (`https://vrindopnishad.in`)  
> **Core Philosophy**: *Ancient Vedic Heritage × High-End Digital Sanctuary × Hyper-Minimalist Apple/Linear Aesthetics*

---

## 1. Executive Design Philosophy

Vrindopnishad is a spiritual digital sanctuary connecting ancient Vedic scriptures, Braj pilgrimage, devotional arts, and philosophic wisdom with modern Gen-Z digital sensibilities. 

### Core Tenets
1. **Soulful & Poetic Over Heavy Academic Clutter**:
   - Scriptures and commentaries are distilled into their emotional essence (*Bhava* and *Rasa*) rather than dense, exhausting commentary blocks.
2. **Organic Liquid Glassmorphism**:
   - No harsh outlines, rigid borders, or generic boxes. Components utilize deep obsidian glass with high saturation backdrop filters and molten droplet connectors.
3. **Calm, Intentional Physics (No AI Generic Translations)**:
   - Strict adherence to organic spring physics (`spring({ bounce: 0.48, duration: 0.747 })`).
   - Zero gratuitous `hover: translateY` jumps. Hover states emphasize subtle ambient glow, surface luminescence, and color warmth.
4. **Mobile-First Ergonomics**:
   - Over 75% of sanctuary seekers visit from mobile devices. All floating islands, touch chips, and card studios snap to touch-optimized dimensions with full safe-area support.

---

## 2. Design Tokens & Foundations

### 2.1 Master Color Palette

| Token Name | Hex / Value | Semantic Role |
|---|---|---|
| `--color-obsidian-bg` | `#08090d` | Deep cosmic sanctuary background |
| `--color-glass-surface` | `rgba(13, 14, 19, 0.96)` | Primary frosted island glass |
| `--color-divine-amber` | `#f59e0b` | Sacred Saffron / Divine Gold primary accent |
| `--color-celestial-cyan` | `#38bdf8` | Yamuna Waters / Celestial Cyan secondary accent |
| `--color-radha-purple` | `#c084fc` | Radha Kripa / Vrindavan Amethyst tertiary accent |
| `--color-text-primary` | `#ffffff` | Primary Devanagari shlokas and headers |
| `--color-text-secondary`| `#cbd5e1` | Poetic translations & body text |
| `--color-text-muted` | `#94a3b8` | Metadata, citations & subtle timestamps |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | Faint glass edge highlight (no harsh outlines) |

### 2.2 Glassmorphism & Backdrop Filters

```css
/* Primary Island Glass Specification */
background: rgba(13, 14, 19, 0.96);
backdrop-filter: blur(40px) saturate(200%);
-webkit-backdrop-filter: blur(40px) saturate(200%);
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 
  0 28px 70px rgba(0, 0, 0, 0.9),
  0 4px 16px rgba(0, 0, 0, 0.5),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

### 2.3 Master Responsive Geometry Matrix

| Component Token | Desktop (≥ 768px) | Tablet (641px – 767px) | Mobile (≤ 640px) |
|---|---|---|---|
| `--island-width` | `min(660px, calc(100vw - 2rem))` | `min(600px, calc(100vw - 1.5rem))` | `calc(100vw - 1.25rem)` (100% bounds) |
| `--island-radius` | `24px` | `22px` | `20px` |
| `--island-padding`| `1.25rem 1.45rem` | `1.15rem 1.3rem` | `0.95rem 1.1rem` |
| `--btn-height` | `38px` (pill) | `38px` (pill) | `38px` (full-width stacked) |
| `--bottom-offset` | `calc(1.5rem + 64px)` | `calc(1.25rem + 58px)` | `calc(1rem + 54px)` |

---

## 3. Typography & Sacred Orthography

### 3.1 Font Stack Hierarchy

- **Devanagari Sanskrit**: `"Noto Sans Devanagari"`, `"Devanagari"`, `serif`
  - High contrast, generous line-height (`1.72`), letter-spacing `0.01em`.
- **Primary Latin & English UI**: Inter, SF Pro Display, system-ui, sans-serif
  - Crisp readability, optical kerning, balanced tracking.

### 3.2 Typography Scale

| Hierarchy | Font Size (Desktop) | Font Size (Mobile) | Weight | Line Height |
|---|---|---|---|---|
| **Display / Hero H1** | `clamp(2.5rem, 6vw, 4.5rem)` | `2.2rem` | 800 | 1.15 |
| **Sanskrit Shloka** | `1.12rem` | `0.98rem` | 600 | 1.72 |
| **Poetic Translation** | `0.85rem` | `0.80rem` | 400 | 1.55 |
| **Brand Tag / Watermark**| `0.72rem` | `0.68rem` | 800 | 1.2 (Tracking: 0.12em) |
| **Citation / Source** | `0.76rem` | `0.70rem` | 700 | 1.2 |

---

## 4. Component Architecture & Ecosystem

```
                                 [ Consensys Mega Nav ]
                                  (z-index: 10000 / 10090)
                                            │
                                            ▼
                              [ Hero & Interactive Bento ]
                                            │
                                            ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                      DYNAMIC ORACLE ISLAND ECOSYSTEM                    │
    │                                                                         │
    │  ┌───────────────────────────────────────────────────────────────────┐  │
    │  │ [ VedicSageModal / QuoteBuilderModal ]                            │  │
    │  │ (Synchronized width: 660px, Spring bounce: 0.48, duration: 0.747) │  │
    │  └─────────────────────────────────┬─────────────────────────────────┘  │
    │                                    │ (Molten Liquid Droplet Neck)       │
    │  ┌─────────────────────────────────▼─────────────────────────────────┐  │
    │  │ [ Liquid Satellite Tray ] (Sacred Quick Topics)                   │  │
    │  └─────────────────────────────────┬─────────────────────────────────┘  │
    │                                    │                                    │
    │  ┌─────────────────────────────────▼─────────────────────────────────┐  │
    │  │ [ VedicAskInputBar ] (Obsidian Capsule Bar, z-index: 99998)       │  │
    │  └───────────────────────────────────────────────────────────────────┘  │
    └─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.1 Consensys Mega Navigation & Mobile Drawer
- **Desktop Navbar**: Sleek backdrop glass with high-contrast links and dropdown mega-menus.
- **Mobile Drawer**:
  - `padding-top: max(32px, env(safe-area-inset-top, 32px))` and `min-height: 96px`.
  - Ensures the logo and `[X]` dismiss button sit comfortably below the viewport header with clear breathing space.

---

### 4.2 Vedic Ask Floating Input Bar (`VedicAskInputBar`)
- **Container**: `position: fixed`, `bottom: 1.5rem`, `z-index: 99998`, width `min(660px, calc(100vw - 2rem))`.
- **Dynamic Elements**:
  - Rotating animated placeholder showing scripture inquiry prompts.
  - Plus (`+`) action button with 45° smooth rotation.
  - Soundwave voice meter with live microphone audio amplitude feedback.
  - Footer Auto-Docking: Disappears smoothly (`opacity: 0, bottom: -4rem`) when near the site footer.

---

### 4.3 Liquid Satellite Tray
- **Rises fluidly** above the input capsule with molten connector droplet.
- **Header**: Live sacred topics badge + touch dismiss button.
- **Horizontal Scrollable Bubbles**:
  - 🎨 *Chitra Vrinda* (Digital Artworks)
  - 🧭 *Vrinda Tours* (Parikrama & Holy Sites)
  - 🪔 *Temple Aarti* (Braj Morning Schedule)
  - 📜 *Daily Shloka* (Gita & Upanishads)
  - 🍲 *Foody Vrinda* (Mahaprasadam)

---

### 4.4 Sage Soul Oracle Card (`VedicSageModal`)
- **Physics**: Elastic gooey spring entrance:
  ```ts
  transition: { type: 'spring', bounce: 0.48, duration: 0.747 }
  ```
- **Visual Structure**:
  - Saffron glowing indicator dot + source tag (`Padma Purana • Braj Rahasya`).
  - Sanskrit Shloka with 2.5px theme accent line on the left.
  - Poetic essence block in translucent glass.
  - Audio drone chanting pill with live soundwave equalizer bars.
  - Side-by-side action buttons: `[ 🎨 Share Quote ]` and `[ 🧭 Open Path ↗ ]`.

---

### 4.5 Social Scripture Studio (`QuoteBuilderModal`)
- **Multi-Format Canvas Generator**:
  - 📱 **Story (9:16 • 1080×1920)**: Formatted for Instagram Stories, WhatsApp Status & Wallpapers.
  - 🔲 **Post (4:5 • 1080×1350)**: Standard for Instagram Feed & Pinterest.
  - 🖥️ **Landscape (16:9 • 1200×675)**: For X (Twitter) & Desktop shares.
- **Borderless Modern Luxury**:
  - Zero harsh outline boxes. Gradients bleed to edge margins.
  - Generates high-res 4K PNG via in-memory HTML5 Canvas and triggers direct instant browser download.
  - 4 Theme Swatches: `Divine Amber`, `Celestial Cyan`, `Vrindavan Amethyst`, `Obsidian Velvet`.

---

## 5. Animation & Interaction Directives

1. **Spring Physics Consistency**:
   - All modals and floating cards use `bounce: 0.48` and `duration: 0.747` (747ms) for a synchronized liquid dynamic feel.
2. **Anti-Jitter Rule**:
   - `transform: translateY` on hover is strictly forbidden on cards to avoid generic AI aesthetics.
   - Hover states use background opacity transitions (`0.15s ease`) and soft ambient glow expansion.
3. **Scroll & Stacking Control**:
   - Fullscreen modals unconditionally apply `document.body.style.overflow = 'hidden'` on mount and restore on unmount.

---

## 6. Performance & Deployment Guidelines

1. **Edge CDN & Vercel Optimization**:
   - `images.unoptimized = true` and `revalidate = false`.
   - 1-year `s-maxage` Edge CDN headers for static assets.
2. **Build Verification Rule**:
   - Every modification must pass `npm run build` (`tsc && vite build`) with zero type errors and zero compilation warnings.
3. **WebGL Fallbacks**:
   - Verify Canvas/WebGL graceful degradation on low-power devices.
