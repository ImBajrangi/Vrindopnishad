// src/components/index.ts - Master Barrel Export

// 1. Navigation
export {
  Header,
  ConsensysMegaNav,
  CurvedElasticDrawer,
  MasterNavigationModal,
  ToolsMenuModal,
  WisdomPathwayModal,
  OpenAISubNav,
} from './navigation';

// 2. Sections
export {
  Hero,
  StorySection,
  ProjectsShowcase,
  ValuesSection,
  BentoGrid,
  AppsSection,
  VedicPhilosophySection,
  SanctuaryExperienceSection,
  OpenAIAcademySection,
  DigitalUniverseSection,
  Footer,
} from './sections';

// 3. Oracle & Spiritual Studio
export {
  VedicAskInputBar,
  VedicSageModal,
  QuoteBuilderModal,
  DailyInsightCard,
  AmbientSoundPlayer,
} from './oracle';

// 4. Auth
export { AuthModal } from './auth/AuthModal';
export { AuthPage } from './auth/AuthPage';

// 5. Feedback
export { NotificationToast, useToasts, toast, toastStore } from './feedback/NotificationToast';
export { OfflineOverlay } from './feedback/OfflineOverlay';

// 6. Effects & Micro-Interactions
export {
  BlurText,
  CustomCursor,
  GradualBlur,
  HorizontalScrollText,
  InfiniteMenu,
  MouseEffects,
  OnScrollTypography,
  OptionWheel,
  PixelIcon,
  RotatingText,
  ScrollBlurText,
  SideRays,
  TextPressure,
} from './effects';
