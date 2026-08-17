// src/components/effects/index.ts - Specialized Effects Barrel Export

// 1. Typography Effects
export { default as BlurText } from './typography/BlurText';
export { default as ScrollBlurText } from './typography/ScrollBlurText';
export { default as TextPressure } from './typography/TextPressure';
export { default as RotatingText } from './typography/RotatingText';
export { HorizontalScrollText } from './typography/HorizontalScrollText';
export { default as OnScrollTypography } from './typography/OnScrollTypography';

// 2. Interactive 3D & Wheels
export { default as InfiniteMenu } from './interactive/InfiniteMenu';
export { default as OptionWheel } from './interactive/OptionWheel';

// 3. Cursor & Pointer Trails
export { CustomCursor } from './cursor/CustomCursor';
export { default as MouseEffects } from './cursor/MouseEffects';

// 4. Shaders & Visual Atmospheres
export { default as SideRays } from './visuals/SideRays';
export { default as GradualBlur } from './visuals/GradualBlur';
export { default as PixelIcon } from './visuals/PixelIcon';
