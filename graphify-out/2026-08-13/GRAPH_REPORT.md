# Graph Report - Vrindopnishad  (2026-08-13)

## Corpus Check
- 102 files · ~4,582,673 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 657 nodes · 884 edges · 51 communities (41 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `864e57d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InfiniteMenu.tsx
- text-vaporize.tsx
- dot-scatter.tsx
- effects.js
- ProjectsShowcase.tsx
- compilerOptions
- dependencies
- AuthPage.tsx
- pixel-led-display.tsx
- cn
- ConsensysMegaNav.tsx
- CustomCursor
- Ripple Effect Methods Documentation
- main.tsx
- text-carousel.tsx
- RotatingText.tsx
- SanctuaryExperienceSection.tsx
- CustomCursor.tsx
- OpenAIAcademySection.tsx
- HorizontalScrollText.tsx
- animated-list.tsx
- App.tsx
- animations.js
- usercursor.tsx
- logo-cloud-3.tsx
- TextPressure.tsx
- vercel.json
- MouseEffects.tsx
- firebase.d.ts
- AuthContext.tsx
- linkme.js
- ScrollBlurText.tsx
- useScrollTextEffects.ts
- content.db.js
- link-handler.js
- QuoteBuilderModal.tsx
- VedicSageModal.tsx
- WisdomPathwayModal.tsx
- DailyInsightCard.tsx
- CurvedElasticDrawer.tsx
- testimonials-6.tsx
- logo-cloud-2.tsx
- testimonials-13.tsx
- SideRays.tsx

## God Nodes (most connected - your core abstractions)
1. `VaporizeTextCycle()` - 18 edges
2. `compilerOptions` - 18 edges
3. `Ripple Effect Methods Documentation` - 16 edges
4. `CustomCursor` - 15 edges
5. `Geometry` - 15 edges
6. `InfiniteGridMenu` - 14 edges
7. `cn()` - 14 edges
8. `initEffects()` - 13 edges
9. `initAnimations()` - 9 edges
10. `useAuth()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ProjectsShowcase()` --references--> `react`  [EXTRACTED]
  src/components/ProjectsShowcase.tsx → package.json
- `AvatarImage()` --references--> `react`  [EXTRACTED]
  src/components/ui/avatar.tsx → package.json
- `InfiniteSlider()` --references--> `react`  [EXTRACTED]
  src/components/ui/infinite-slider.tsx → package.json
- `AppContent()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `AuthModal()` --calls--> `triggerSuccessConfetti()`  [EXTRACTED]
  src/components/AuthModal.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (51 total, 10 thin omitted)

### Community 0 - "InfiniteMenu.tsx"
Cohesion: 0.05
Nodes (25): ActiveItemCallback, ArcballControl, Camera, createAndSetupTexture(), createProgram(), createShader(), defaultItems, DiscGeometry (+17 more)

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

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (44): canvas-confetti, firebase, framer-motion, gl-matrix, gsap, lucide-react, next-themes, ogl (+36 more)

### Community 7 - "AuthPage.tsx"
Cohesion: 0.24
Nodes (10): AuthModalProps, AuthPageProps, Button, ButtonProps, Api, Confetti, ConfettiButtonProps, ConfettiContext (+2 more)

### Community 8 - "pixel-led-display.tsx"
Cohesion: 0.08
Nodes (23): AppsSection(), BentoGrid(), OnScrollTypography(), OnScrollTypographyProps, buildColumns(), Direction, DotShape, EXTRA (+15 more)

### Community 9 - "cn"
Cohesion: 0.09
Nodes (24): react, react, ProjectsShowcase(), Avatar(), AvatarFallback(), AvatarImage(), Card, CardContent (+16 more)

### Community 10 - "ConsensysMegaNav.tsx"
Cohesion: 0.12
Nodes (13): ConsensysMegaNav(), ConsensysMegaNavProps, MobileLevel, TabType, Header(), HeaderProps, AnimatedThemeToggler(), AnimatedThemeTogglerProps (+5 more)

### Community 12 - "Ripple Effect Methods Documentation"
Cohesion: 0.05
Nodes (42): Available Animations, Available Effects, Available Sizes, Available Themes, Available Variants, Browser Support, CSS Variables, Custom Animations (+34 more)

### Community 13 - "main.tsx"
Cohesion: 0.13
Nodes (7): App(), rootElement, initTypography(), wrapElements(), getCookie(), initCookieConsent(), CustomCursor

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

### Community 18 - "OpenAIAcademySection.tsx"
Cohesion: 0.16
Nodes (10): AutoMovingCursorProps, OpenAIAcademySection(), OpenAIAcademySectionProps, OpenAISubNav(), OpenAISubNavProps, SubNavTabType, firstRow, reviews (+2 more)

### Community 19 - "HorizontalScrollText.tsx"
Cohesion: 0.28
Nodes (7): HorizontalScrollText(), HorizontalScrollTextProps, MORPH_WORDS, COMPONENT_DEFAULTS, mapEaseToCSS(), TextMorph(), TextMorphProps

### Community 20 - "animated-list.tsx"
Cohesion: 0.22
Nodes (5): AnimatedList, AnimatedListProps, defaultNotifications, NotificationItem, notifications

### Community 21 - "App.tsx"
Cohesion: 0.13
Nodes (15): AppContent(), AmbientSoundPlayer(), AmbientSoundPlayerProps, AuthModal(), AuthPage(), DigitalUniverseSection(), DigitalUniverseSectionProps, Footer() (+7 more)

### Community 23 - "animations.js"
Cohesion: 0.22
Nodes (10): initAnimations(), initCursor(), initHorizontalScroll(), initMobileMenu(), initNotifications(), initParallaxBg(), initProjectHover(), initScrollProgress() (+2 more)

### Community 24 - "usercursor.tsx"
Cohesion: 0.33
Nodes (5): ClassNames, COMPONENT_DEFAULTS, Props, useIsStaticRenderer(), UserCursor()

### Community 26 - "TextPressure.tsx"
Cohesion: 0.53
Nodes (5): debounce(), dist(), getAttr(), TextPressure(), TextPressureProps

### Community 27 - "vercel.json"
Cohesion: 0.33
Nodes (5): cleanUrls, headers, rewrites, trailingSlash, version

### Community 28 - "MouseEffects.tsx"
Cohesion: 0.33
Nodes (5): Effect, InteractionMode, MouseEffects(), Particle, Props

### Community 29 - "firebase.d.ts"
Cohesion: 0.40
Nodes (4): firebase/app, firebase/auth, firebase/database, firebase/firestore

### Community 31 - "AuthContext.tsx"
Cohesion: 0.40
Nodes (8): AuthContext, AuthContextType, AuthProvider(), triggerSuccessConfetti(), clearCachedUser(), getCachedUser(), setCachedUser(), UserProfile

### Community 32 - "linkme.js"
Cohesion: 0.60
Nodes (4): loadCss(), loadJs(), loadPageAssets(), pageAssets

### Community 42 - "QuoteBuilderModal.tsx"
Cohesion: 0.40
Nodes (4): QuoteBuilderModal(), QuoteBuilderModalProps, QuoteVerseData, THEMES

### Community 43 - "VedicSageModal.tsx"
Cohesion: 0.40
Nodes (4): ScripturalResponse, SCRIPTURE_DATABASE, VedicSageModal(), VedicSageModalProps

### Community 44 - "WisdomPathwayModal.tsx"
Cohesion: 0.50
Nodes (4): PathwayOption, PATHWAYS, WisdomPathwayModal(), WisdomPathwayModalProps

### Community 47 - "testimonials-6.tsx"
Cohesion: 0.25
Nodes (5): firstColumn, secondColumn, Testimonial, testimonials, thirdColumn

### Community 50 - "SideRays.tsx"
Cohesion: 0.31
Nodes (7): Hero(), HeroProps, hexToRgb(), Origin, originToFlip(), SideRays(), SideRaysProps

## Knowledge Gaps
- **248 isolated node(s):** `mat4`, `contentDB`, `dbHelpers`, `PROJECT_PATHS`, `pageAssets` (+243 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `dependencies`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `cn`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `ProjectsShowcase()` connect `cn` to `ProjectsShowcase.tsx`, `App.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `mat4`, `contentDB`, `dbHelpers` to the rest of the system?**
  _248 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `InfiniteMenu.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0519774011299435 - nodes in this community are weakly interconnected._
- **Should `text-vaporize.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11827956989247312 - nodes in this community are weakly interconnected._
- **Should `dot-scatter.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._