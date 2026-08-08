# Graph Report - Vrindopnishad  (2026-08-07)

## Corpus Check
- 85 files · ~4,576,162 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 579 nodes · 788 edges · 39 communities (33 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8dbf209f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InfiniteMenu.tsx
- text-vaporize.tsx
- dot-scatter.tsx
- effects.js
- ProjectsShowcase.tsx
- compilerOptions
- devDependencies
- App.tsx
- pixel-led-display.tsx
- animated-theme-toggler.tsx
- dependencies
- CustomCursor
- Ripple Effect Methods Documentation
- animations.js
- text-carousel.tsx
- RotatingText.tsx
- SanctuaryExperienceSection.tsx
- CustomCursor.tsx
- Geometry
- HorizontalScrollText.tsx
- animated-list.tsx
- Hero.tsx
- CustomCursor
- usercursor.tsx
- TextPressure.tsx
- vercel.json
- firebase.d.ts
- linkme.js
- ScrollBlurText.tsx
- useScrollTextEffects.ts
- content.db.js
- link-handler.js

## God Nodes (most connected - your core abstractions)
1. `VaporizeTextCycle()` - 18 edges
2. `compilerOptions` - 18 edges
3. `Ripple Effect Methods Documentation` - 16 edges
4. `CustomCursor` - 15 edges
5. `Geometry` - 15 edges
6. `InfiniteGridMenu` - 14 edges
7. `initEffects()` - 13 edges
8. `initAnimations()` - 9 edges
9. `useAuth()` - 9 edges
10. `CustomCursor` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ProjectsShowcase()` --references--> `react`  [EXTRACTED]
  src/components/ProjectsShowcase.tsx → package.json
- `AppContent()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `AuthModal()` --calls--> `triggerSuccessConfetti()`  [EXTRACTED]
  src/components/AuthModal.tsx → src/context/AuthContext.tsx
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/AuthModal.tsx → src/context/AuthContext.tsx
- `AuthPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/AuthPage.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (39 total, 6 thin omitted)

### Community 0 - "InfiniteMenu.tsx"
Cohesion: 0.07
Nodes (22): ActiveItemCallback, ArcballControl, Camera, createAndSetupTexture(), createProgram(), createShader(), defaultItems, Face (+14 more)

### Community 1 - "text-vaporize.tsx"
Cohesion: 0.12
Nodes (30): assignScatter(), assignStarts(), calculateVaporizeSpread(), cleanup(), createParticles(), cubicBezierEase(), DEFAULT_PROPS, delayOf() (+22 more)

### Community 2 - "dot-scatter.tsx"
Cohesion: 0.09
Nodes (28): ActiveScatter, buildScatterBand(), buildWords(), DEFAULT_TEXT_OPTIONS, FALLBACK_GLYPH, generateTextTargets(), getMaxBandHeightPx(), getRadiusMarkIndices() (+20 more)

### Community 3 - "effects.js"
Cohesion: 0.12
Nodes (17): initAnimatedGradients(), initEffects(), initImageDistortion(), initMagneticEffect(), initMobileMenuEffects(), initNoiseEffect(), initPageTransitions(), initParallaxScroll() (+9 more)

### Community 4 - "ProjectsShowcase.tsx"
Cohesion: 0.12
Nodes (19): CURVE_FUNCTIONS, debounce(), DEFAULT_CONFIG, getGradientDirection(), GradualBlur(), GradualBlurMemo, GradualBlurProps, mergeConfigs() (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.08
Nodes (23): DOM, DOM.Iterable, ES2022, src, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules (+15 more)

### Community 6 - "devDependencies"
Cohesion: 0.08
Nodes (23): devDependencies, @types/canvas-confetti, @types/node, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react (+15 more)

### Community 7 - "App.tsx"
Cohesion: 0.05
Nodes (47): AppContent(), AuthModal(), AuthModalProps, AuthPage(), AuthPageProps, ConsensysMegaNav(), ConsensysMegaNavProps, MobileLevel (+39 more)

### Community 8 - "pixel-led-display.tsx"
Cohesion: 0.08
Nodes (23): AppsSection(), BentoGrid(), OnScrollTypography(), OnScrollTypographyProps, buildColumns(), Direction, DotShape, EXTRA (+15 more)

### Community 9 - "animated-theme-toggler.tsx"
Cohesion: 0.24
Nodes (6): AnimatedThemeToggler(), AnimatedThemeTogglerProps, getThemeTransitionClipPaths(), polygonCollapsed(), TransitionVariant, cn()

### Community 10 - "dependencies"
Cohesion: 0.08
Nodes (24): canvas-confetti, firebase, framer-motion, gl-matrix, gsap, lucide-react, next-themes, ogl (+16 more)

### Community 12 - "Ripple Effect Methods Documentation"
Cohesion: 0.05
Nodes (42): Available Animations, Available Effects, Available Sizes, Available Themes, Available Variants, Browser Support, CSS Variables, Custom Animations (+34 more)

### Community 13 - "animations.js"
Cohesion: 0.10
Nodes (16): App(), rootElement, initAnimations(), initCursor(), initHorizontalScroll(), initMobileMenu(), initNotifications(), initParallaxBg() (+8 more)

### Community 14 - "text-carousel.tsx"
Cohesion: 0.23
Nodes (11): buildElements(), FontStyle, mapEase(), mapStaggerFrom(), Props, RotatingText(), SplitBy, splitIntoCharacters() (+3 more)

### Community 15 - "RotatingText.tsx"
Cohesion: 0.23
Nodes (11): buildElements(), FontStyle, mapEase(), mapStaggerFrom(), RotatingText(), RotatingTextProps, SplitBy, splitIntoCharacters() (+3 more)

### Community 16 - "SanctuaryExperienceSection.tsx"
Cohesion: 0.27
Nodes (8): BlurText(), BlurTextProps, buildKeyframes(), renderAgamaResonanceHeadline(), SACRED_VERSES, SanctuaryExperienceSection(), SanctuaryExperienceSectionProps, VerseData

### Community 17 - "CustomCursor.tsx"
Cohesion: 0.22
Nodes (7): ClassNames, COMPONENT_DEFAULTS, CustomCursor, __OriginkitBase_UserCursor(), __originkitPresetProps, Props, useIsStaticRenderer()

### Community 18 - "Geometry"
Cohesion: 0.17
Nodes (3): DiscGeometry, Geometry, IcosahedronGeometry

### Community 19 - "HorizontalScrollText.tsx"
Cohesion: 0.28
Nodes (7): HorizontalScrollText(), HorizontalScrollTextProps, MORPH_WORDS, COMPONENT_DEFAULTS, mapEaseToCSS(), TextMorph(), TextMorphProps

### Community 20 - "animated-list.tsx"
Cohesion: 0.22
Nodes (5): AnimatedList, AnimatedListProps, defaultNotifications, NotificationItem, notifications

### Community 21 - "Hero.tsx"
Cohesion: 0.21
Nodes (10): Hero(), HeroProps, hexToRgb(), Origin, originToFlip(), SideRays(), SideRaysProps, PROMPT_SUGGESTIONS (+2 more)

### Community 24 - "usercursor.tsx"
Cohesion: 0.33
Nodes (5): ClassNames, COMPONENT_DEFAULTS, Props, useIsStaticRenderer(), UserCursor()

### Community 26 - "TextPressure.tsx"
Cohesion: 0.53
Nodes (5): debounce(), dist(), getAttr(), TextPressure(), TextPressureProps

### Community 27 - "vercel.json"
Cohesion: 0.33
Nodes (5): cleanUrls, headers, rewrites, trailingSlash, version

### Community 29 - "firebase.d.ts"
Cohesion: 0.40
Nodes (4): firebase/app, firebase/auth, firebase/database, firebase/firestore

### Community 32 - "linkme.js"
Cohesion: 0.60
Nodes (4): loadCss(), loadJs(), loadPageAssets(), pageAssets

## Knowledge Gaps
- **209 isolated node(s):** `mat4`, `contentDB`, `dbHelpers`, `PROJECT_PATHS`, `pageAssets` (+204 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProjectsShowcase()` connect `dependencies` to `ProjectsShowcase.tsx`, `App.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `mat4`, `contentDB`, `dbHelpers` to the rest of the system?**
  _209 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `InfiniteMenu.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0708245243128964 - nodes in this community are weakly interconnected._
- **Should `text-vaporize.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11827956989247312 - nodes in this community are weakly interconnected._
- **Should `dot-scatter.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._
- **Should `effects.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11965811965811966 - nodes in this community are weakly interconnected._