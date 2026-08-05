import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './SideRays.css';

type Origin = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  darkRayColor1?: string;
  darkRayColor2?: string;
  lightRayColor1?: string;
  lightRayColor2?: string;
  intensity?: number;
  darkIntensity?: number;
  lightIntensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  darkOpacity?: number;
  lightOpacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const originToFlip = (origin: Origin): [number, number] => {
  switch (origin) {
    case 'top-left': return [1, 0];
    case 'bottom-right': return [0, 1];
    case 'bottom-left': return [1, 1];
    default: return [0, 0];
  }
};

export const SideRays = ({
  speed = 2.5,
  rayColor1,
  rayColor2,
  darkRayColor1 = '#e7c354',
  darkRayColor2 = '#96c8ff',
  lightRayColor1 = '#ca8a04',
  lightRayColor2 = '#2563eb',
  intensity,
  darkIntensity = 0.6,
  lightIntensity = 0.4,
  spread = 2,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity,
  darkOpacity = 0.85,
  lightOpacity = 0.6,
  className = ''
}: SideRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: number | number[] }> | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initial Theme Detection
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return (
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark-mode') ||
      (!document.documentElement.classList.contains('light') &&
        !document.body.classList.contains('light-mode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  // Compute active colors based on theme
  const activeRayColor1 = isDark
    ? (rayColor1 || darkRayColor1)
    : (lightRayColor1 || rayColor1 || '#ca8a04');

  const activeRayColor2 = isDark
    ? (rayColor2 || darkRayColor2)
    : (lightRayColor2 || rayColor2 || '#2563eb');

  const activeIntensity = isDark
    ? (intensity ?? darkIntensity)
    : (lightIntensity ?? intensity ?? 0.4);

  const activeOpacity = isDark
    ? (opacity ?? darkOpacity)
    : (lightOpacity ?? opacity ?? 0.6);

  // Refs for real-time WebGL loop synchronization without re-initializing WebGL context
  const activeRayColor1Ref = useRef(activeRayColor1);
  const activeRayColor2Ref = useRef(activeRayColor2);
  const activeIntensityRef = useRef(activeIntensity);
  const activeOpacityRef = useRef(activeOpacity);

  activeRayColor1Ref.current = activeRayColor1;
  activeRayColor2Ref.current = activeRayColor2;
  activeIntensityRef.current = activeIntensity;
  activeOpacityRef.current = activeOpacity;

  useEffect(() => {
    const checkTheme = () => {
      const darkActive =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark-mode') ||
        (!document.documentElement.classList.contains('light') &&
          !document.body.classList.contains('light-mode') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      const col1 = darkActive ? (rayColor1 || darkRayColor1) : (lightRayColor1 || rayColor1 || '#ca8a04');
      const col2 = darkActive ? (rayColor2 || darkRayColor2) : (lightRayColor2 || rayColor2 || '#2563eb');
      const intVal = darkActive ? (intensity ?? darkIntensity) : (lightIntensity ?? intensity ?? 0.4);
      const opVal = darkActive ? (opacity ?? darkOpacity) : (lightOpacity ?? opacity ?? 0.6);

      activeRayColor1Ref.current = col1;
      activeRayColor2Ref.current = col2;
      activeIntensityRef.current = intVal;
      activeOpacityRef.current = opVal;

      if (uniformsRef.current) {
        uniformsRef.current.iRayColor1.value = hexToRgb(col1);
        uniformsRef.current.iRayColor2.value = hexToRgb(col2);
        uniformsRef.current.iIntensity.value = intVal;
        uniformsRef.current.iOpacity.value = opVal;
      }

      // Synchronous immediate WebGL render frame for View Transitions API snapshotting
      if (rendererRef.current && meshRef.current) {
        try {
          rendererRef.current.render({ scene: meshRef.current });
        } catch (e) {}
      }

      setIsDark(darkActive);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => checkTheme();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, [rayColor1, darkRayColor1, lightRayColor1, rayColor2, darkRayColor2, lightRayColor2, intensity, darkIntensity, lightIntensity, opacity, darkOpacity, lightOpacity]);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise<void>(resolve => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

      const [flipX, flipY] = originToFlip(origin);
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] as number[] },
        iSpeed: { value: speed },
        iRayColor1: { value: hexToRgb(activeRayColor1Ref.current) as number[] },
        iRayColor2: { value: hexToRgb(activeRayColor2Ref.current) as number[] },
        iIntensity: { value: activeIntensityRef.current },
        iSpread: { value: spread },
        iFlipX: { value: flipX },
        iFlipY: { value: flipY },
        iTilt: { value: tilt },
        iSaturation: { value: saturation },
        iBlend: { value: blend },
        iFalloff: { value: falloff },
        iOpacity: { value: activeOpacityRef.current }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        const timeSec = t * 0.001;
        uniforms.iTime.value = timeSec;

        // Dynamic Lighting Shifts (breathing intensity & spread without changing colors)
        const dynamicLightingFactor = 1.0 + 0.28 * Math.sin(timeSec * 0.95) + 0.14 * Math.cos(timeSec * 1.6);
        const dynamicSpreadFactor = 1.0 + 0.18 * Math.sin(timeSec * 0.75);

        uniforms.iIntensity.value = activeIntensityRef.current * dynamicLightingFactor;
        uniforms.iOpacity.value = activeOpacityRef.current;
        uniforms.iSpread.value = spread * dynamicSpreadFactor;
        uniforms.iRayColor1.value = hexToRgb(activeRayColor1Ref.current);
        uniforms.iRayColor2.value = hexToRgb(activeRayColor2Ref.current);

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (e) {
          return;
        }
      };

      window.addEventListener('resize', updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener('resize', updateSize);
        if (renderer) {
          try {
            const loseCtx = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseCtx) loseCtx.loseContext();
            const canvas = renderer.gl.canvas;
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
          } catch (e) {}
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [isVisible, speed, spread, origin, tilt, saturation, blend, falloff]);

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />;
};

export default SideRays;
