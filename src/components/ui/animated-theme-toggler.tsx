"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

export const SolidMoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1.15em"
    height="1.15em"
    {...props}
  >
    <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.44a8.59 8.59 0 0 1 .73-3.37 1 1 0 0 0-1.29-1.29A10.16 10.16 0 0 0 2 10.7a10.15 10.15 0 0 0 10.15 10.15c4.74 0 8.78-3.26 9.87-7.85a1 1 0 0 0-.38-1z" />
  </svg>
)

export const SolidSunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1.15em"
    height="1.15em"
    {...props}
  >
    <circle cx="12" cy="12" r="5.5" />
    <path d="M12 1.5a1.25 1.25 0 0 1 1.25 1.25v1.5a1.25 1.25 0 0 1-2.5 0v-1.5A1.25 1.25 0 0 1 12 1.5zM12 18.5a1.25 1.25 0 0 1 1.25 1.25v1.5a1.25 1.25 0 0 1-2.5 0v-1.5A1.25 1.25 0 0 1 12 18.5zM4.05 4.05a1.25 1.25 0 0 1 1.77 0l1.06 1.06a1.25 1.25 0 1 1-1.77 1.77L4.05 5.82a1.25 1.25 0 0 1 0-1.77zM17.12 17.12a1.25 1.25 0 0 1 1.77 0l1.06 1.06a1.25 1.25 0 0 1-1.77 1.77l-1.06-1.06a1.25 1.25 0 0 1 0-1.77zM1.5 12a1.25 1.25 0 0 1 1.25-1.25h1.5a1.25 1.25 0 0 1 0 2.5h-1.5A1.25 1.25 0 0 1 1.5 12zM18.5 12a1.25 1.25 0 0 1 1.25-1.25h1.5a1.25 1.25 0 0 1 0 2.5h-1.5A1.25 1.25 0 0 1 18.5 12zM4.05 19.95a1.25 1.25 0 0 1 0-1.77l1.06-1.06a1.25 1.25 0 1 1 1.77 1.77l-1.06 1.06a1.25 1.25 0 0 1-1.77 0zM17.12 6.88a1.25 1.25 0 0 1 0-1.77l1.06-1.06a1.25 1.25 0 1 1 1.77 1.77l-1.06 1.06a1.25 1.25 0 0 1-1.77 0z" />
  </svg>
)

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean
  /**
   * Controlled theme value. When provided, the parent owns persistence
   * (e.g. `next-themes`) and this component will not write to localStorage.
   */
  theme?: "light" | "dark"
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (theme: "light" | "dark") => void
  /** Custom Sun icon */
  sunIcon?: React.ReactNode
  /** Custom Moon icon */
  moonIcon?: React.ReactNode
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ")
  return `polygon(${pairs})`
}

// All coordinates are percentages of the snapshot reference box: Chrome 150
// renders absolute px clip-path coordinates on ::view-transition-new(root)
// unscaled on fractional display scales (e.g. Windows 150%) for the first
// transition after load, so px values land at the wrong position (#989).
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  switch (variant) {
    case "circle":
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`]
    }
    case "diamond": {
      // Slightly larger than the view-transition circle radius so axis-aligned coverage matches the circle reveal.
      const R = maxRadius * Math.SQRT2
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2
      const verts: string[] = []
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)))
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ]
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "star": {
      // Small overscan so the last frames never leave a 1px seam before the transition group ends.
      const R = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const starPolygon = (radius: number) => {
        const verts: string[] = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA)
            )
          )
          const innerA = outerA + Math.PI / 5
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          )
        }
        return `polygon(${verts.join(", ")})`
      }
      const startR = Math.max(2, R * 0.025)
      return [starPolygon(startR), starPolygon(R)]
    }
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  variant,
  fromCenter = false,
  theme,
  onThemeChange,
  sunIcon,
  moonIcon,
  ...props
}: AnimatedThemeTogglerProps) => {
  const shape = variant ?? "circle"
  const isControlled = theme !== undefined
  const [internalIsDark, setInternalIsDark] = useState(false)
  const isDark = isControlled ? theme === "dark" : internalIsDark
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    if (isControlled) return

    const applyClassTheme = (isDarkTheme: boolean) => {
      document.documentElement.classList.toggle("dark", isDarkTheme)
      document.documentElement.classList.toggle("light", !isDarkTheme)
      document.body.classList.toggle("dark-mode", isDarkTheme)
      document.body.classList.toggle("light-mode", !isDarkTheme)
      setInternalIsDark(isDarkTheme)
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      applyClassTheme(savedTheme === "dark")
    } else {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      applyClassTheme(isSystemDark)
    }

    const updateTheme = () => {
      const isCurrentlyDark =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark-mode")
      setInternalIsDark(isCurrentlyDark)
    }

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        applyClassTheme(e.matches)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange)
    } else {
      mediaQuery.addListener(handleSystemChange)
    }

    return () => {
      observer.disconnect()
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemChange)
      } else {
        mediaQuery.removeListener(handleSystemChange)
      }
    }
  }, [isControlled])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (
      !button ||
      isTransitioningRef.current ||
      document.documentElement.dataset.magicuiThemeVt === "active"
    )
      return

    // innerWidth/innerHeight (not visualViewport): percentages must resolve
    // against the snapshot reference box, which includes classic scrollbars.
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x: number
    let y: number
    if (fromCenter) {
      x = viewportWidth / 2
      y = viewportHeight / 2
    } else {
      const { top, left, width, height } = button.getBoundingClientRect()
      x = left + width / 2
      y = top + height / 2
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const newTheme = !isDark
      // Always toggle the classes synchronously so the View Transitions API
      // snapshots the new theme inside the startViewTransition callback.
      document.documentElement.classList.toggle("dark", newTheme)
      document.documentElement.classList.toggle("light", !newTheme)
      document.body.classList.toggle("dark-mode", newTheme)
      document.body.classList.toggle("light-mode", !newTheme)

      if (isControlled) {
        onThemeChange?.(newTheme ? "dark" : "light")
      } else {
        setInternalIsDark(newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      }
    }

    const doc = document as any
    if (typeof doc.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const clipPath = getThemeTransitionClipPaths(
      shape,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    )

    const root = document.documentElement
    root.dataset.magicuiThemeVt = "active"
    root.style.setProperty(
      "--magicui-theme-toggle-vt-duration",
      `${duration}ms`
    )
    // Pin the collapsed clip-path via CSS so Firefox does not paint the new
    // theme unclipped between snapshot and the ready.then() JS animation.
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0])
    const cleanup = () => {
      isTransitioningRef.current = false
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
    }

    isTransitioningRef.current = true
    const transition = doc.startViewTransition(() => {
      flushSync(applyTheme)
    })
    if (typeof transition?.finished?.finally === "function") {
      transition.finished.finally(cleanup).catch(() => {})
    } else {
      cleanup()
    }

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath,
            },
            {
              duration,
              // Star: linear avoids easing overshoot that fights polygon interpolation at t→1; VT group duration is synced above.
              easing: shape === "star" ? "linear" : "ease-in-out",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            } as any
          )
        })
        .catch(() => {})
    }
  }, [shape, fromCenter, duration, isDark, isControlled, onThemeChange])

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("inline-flex items-center justify-center relative cursor-pointer select-none", className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        ...props.style
      }}
      {...props}
    >
      <span className="theme-toggle-icon-wrap" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s ease, color 0.25s ease' }}>
        {isDark ? (sunIcon ?? <SolidSunIcon />) : (moonIcon ?? <SolidMoonIcon />)}
      </span>
      <span
        className="sr-only"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0'
        }}
      >
        Toggle theme
      </span>
    </button>
  )
}
