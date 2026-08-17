import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
    type SpringOptions,
    type MotionValue,
} from "framer-motion"

const useIsStaticRenderer = () => false

type ClassNames = {
    root?: string
    cursor?: string
    arrow?: string
    label?: string
    labelText?: string
}

type Props = {
    // Visual / content
    name?: string
    arrow?: React.ReactNode | ((color: string) => React.ReactNode)
    label?: React.ReactNode
    color?: string
    textColor?: string
    size?: number
    labelTiltStrength?: number

    // Behavior
    showLabel?: boolean

    // Offsets
    offsetX?: number
    offsetY?: number
    labelOffsetUseDefault?: boolean
    labelOffsetX?: number
    labelOffsetY?: number

    // Press feedback
    pressScale?: number

    offset?: { x?: number; y?: number }
    labelOffset?: { x?: number; y?: number }
    classNames?: ClassNames

    style?: React.CSSProperties
}

const COMPONENT_DEFAULTS = {
    color: "#FFFFFF",
    size: 31,
    pressScale: 0.92,
    offsetX: 0,
    offsetY: 0,
    showLabel: true,
    name: "",
    textColor: "#000000",
    labelTiltStrength: 25,
    labelOffsetUseDefault: true,
    labelOffsetX: 25,
    labelOffsetY: 12,
}

/**
 * Clean & Simplified CustomCursor:
 * - Shows Originkit UserCursor (white soft arrow + trailing pill) on picture blocks.
 * - Shows classic dot & smooth circle cursor everywhere else.
 */
export function __OriginkitBase_UserCursor(props: Props) {
    const mergedProps = { ...COMPONENT_DEFAULTS, ...props }
    const {
        name: defaultName,
        arrow,
        label: customLabel,
        color,
        textColor,
        size,
        labelTiltStrength,
        showLabel,
        offsetX,
        offsetY,
        labelOffsetX,
        labelOffsetY,
        labelOffsetUseDefault,
        pressScale,
        classNames,
        offset: offsetOverride,
        labelOffset: labelOffsetOverride,
        style,
    } = mergedProps

    const hideOnTouch = true
    const zIndex = 99999

    const isStatic = useIsStaticRenderer()

    // --- touch detection -----------------------------------------------------
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    useEffect(() => {
        if (!hideOnTouch) {
            setIsTouchDevice(false)
            return
        }
        if (typeof window === "undefined" || !window.matchMedia) return
        const mql = window.matchMedia("(pointer: coarse)")
        const sync = () => setIsTouchDevice(!!mql.matches)
        sync()
        if (mql.addEventListener) {
            mql.addEventListener("change", sync)
            return () => mql.removeEventListener("change", sync)
        }
        const legacy = mql as MediaQueryList & {
            addListener?: (l: (e: MediaQueryListEvent) => void) => void
            removeListener?: (l: (e: MediaQueryListEvent) => void) => void
        }
        legacy.addListener?.(sync)
        return () => legacy.removeListener?.(sync)
    }, [hideOnTouch])

    // --- visible state ------------------------------------------------------
    const [hoveringPicture, setHoveringPicture] = useState(false)
    const [pictureName, setPictureName] = useState<string | null>(null)
    const [pressed, setPressed] = useState(false)

    // Dot & circle refs
    const dotRef = useRef<HTMLDivElement | null>(null)
    const circleRef = useRef<HTMLDivElement | null>(null)

    // Arrow locks statically on pointer tip; label trails smoothly behind
    const arrowSpring = useMemo<SpringOptions>(
        () => ({ stiffness: 1000, damping: 50, mass: 0.1 }),
        []
    )
    const labelSpringCfg = useMemo<SpringOptions>(
        () => ({ stiffness: 220, damping: 26, mass: 0.7 }),
        []
    )

    const resolvedOffset = useMemo(
        () => ({
            x: offsetOverride?.x ?? offsetX,
            y: offsetOverride?.y ?? offsetY,
        }),
        [offsetOverride?.x, offsetOverride?.y, offsetX, offsetY]
    )

    const resolvedLabelOffset = useMemo(() => {
        if (labelOffsetOverride) {
            return {
                x: labelOffsetOverride.x ?? size * 0.9,
                y: labelOffsetOverride.y ?? size * 0.2 + 6,
            }
        }
        if (labelOffsetUseDefault) {
            return { x: size * 0.9, y: size * 0.2 + 6 }
        }
        return { x: labelOffsetX, y: labelOffsetY }
    }, [
        labelOffsetOverride?.x,
        labelOffsetOverride?.y,
        labelOffsetUseDefault,
        labelOffsetX,
        labelOffsetY,
        size,
    ])

    // Motion values for UserCursor
    const mouseX = useMotionValue(-9999)
    const mouseY = useMotionValue(-9999)

    const arrowX = useSpring(mouseX, arrowSpring)
    const arrowY = useSpring(mouseY, arrowSpring)
    const labelX = useSpring(mouseX, labelSpringCfg)
    const labelY = useSpring(mouseY, labelSpringCfg)

    const scaleMV = useMotionValue(1)
    useEffect(() => {
        const controls = animate(scaleMV, pressed ? pressScale : 1, {
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
        })
        return () => controls.stop()
    }, [pressed, pressScale, scaleMV])

    const labelTiltTarget = useMotionValue(0)
    const labelRotation = useSpring(labelTiltTarget, {
        stiffness: 200,
        damping: 24,
        mass: 0.6,
    })

    const lastSampleRef = useRef<{ x: number; y: number; t: number } | null>(null)

    useEffect(() => {
        if (isStatic || isTouchDevice) return
        if (typeof window === "undefined") return

        const dot = dotRef.current
        const circle = circleRef.current

        let circleX = window.innerWidth / 2
        let circleY = window.innerHeight / 2
        let rawMouseX = circleX
        let rawMouseY = circleY
        let animFrameId: number

        const animateDotCircle = () => {
            const ease = 0.15
            circleX += (rawMouseX - circleX) * ease
            circleY += (rawMouseY - circleY) * ease

            if (dot) {
                dot.style.left = `${rawMouseX}px`
                dot.style.top = `${rawMouseY}px`
            }
            if (circle) {
                circle.style.left = `${circleX}px`
                circle.style.top = `${circleY}px`
            }

            animFrameId = requestAnimationFrame(animateDotCircle)
        }

        animFrameId = requestAnimationFrame(animateDotCircle)

        const onMove = (e: MouseEvent) => {
            const x = e.clientX
            const y = e.clientY
            rawMouseX = x
            rawMouseY = y

            const now = typeof performance !== "undefined" ? performance.now() : Date.now()
            const last = lastSampleRef.current
            let vx = 0
            let vy = 0
            if (last) {
                const dt = Math.max(1, now - last.t)
                vx = ((x - last.x) / dt) * 1000
                vy = ((y - last.y) / dt) * 1000
            }
            lastSampleRef.current = { x, y, t: now }

            if (mouseX.get() === -9999) {
                mouseX.jump(x)
                mouseY.jump(y)
            } else {
                mouseX.set(x)
                mouseY.set(y)
            }

            const speed = Math.hypot(vx, vy)
            const norm = Math.min(1, speed / 1500)
            const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1
            labelTiltTarget.set(sign * norm * labelTiltStrength)

            const target = e.target as HTMLElement | null

            if (target?.closest('#infinite-grid-menu-canvas, canvas')) {
                setHoveringPicture(false)
                setPictureName(null)
                if (dot) dot.style.display = 'block'
                if (circle) circle.style.display = 'block'
                return
            }

            const picContainer = target?.closest('img, picture, .showcase-card, .project-item, .showcase-image, .apps-card, .bento-card, .more-item, [data-image]') as HTMLElement | null

            if (picContainer) {
                setHoveringPicture(true)
                const cardEl = picContainer.closest('.showcase-card, .project-item, .apps-card, .bento-card, .more-item, [data-image]') || picContainer
                const headingEl = cardEl.querySelector('h3, .project-title, .apps-info h3, .more-name')
                const imgEl = cardEl.querySelector('img')
                const labelText = headingEl?.textContent?.trim() || imgEl?.alt || cardEl.getAttribute('data-image') || undefined
                if (labelText) setPictureName(labelText)

                if (dot) dot.style.display = 'none'
                if (circle) circle.style.display = 'none'
            } else {
                setHoveringPicture(false)
                setPictureName(null)

                if (dot) dot.style.display = 'block'
                if (circle) circle.style.display = 'block'
            }
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target || !dot || !circle) return

            if (target.closest('img, picture, .showcase-card, .project-item, .showcase-image, .apps-card, .bento-card, .more-item, [data-image]')) return

            const hoverable = target.closest('a, button, .btn, .tools-icon, .tree-node, .value-card, input[type="submit"]')
            if (hoverable) {
                dot.classList.add('hover')
                circle.classList.add('hover')
                dot.classList.remove('text')
                circle.classList.remove('text')
                return
            }

            const textable = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, input, textarea')
            if (textable) {
                dot.classList.add('text')
                circle.classList.add('text')
                dot.classList.remove('hover')
                circle.classList.remove('hover')
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target || !dot || !circle) return

            const hoverable = target.closest('a, button, .btn, .tools-icon, .tree-node, .value-card, input[type="submit"]')
            if (hoverable) {
                dot.classList.remove('hover')
                circle.classList.remove('hover')
            }

            const textable = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, input, textarea')
            if (textable) {
                dot.classList.remove('text')
                circle.classList.remove('text')
            }
        }

        const onDown = () => {
            setPressed(true)
            if (dot) dot.classList.add('click')
            if (circle) circle.classList.add('click')
        }

        const onUp = () => {
            setPressed(false)
            if (dot) dot.classList.remove('click')
            if (circle) circle.classList.remove('click')
        }

        // Inject global cursor: none !important rule to prevent native OS cursor flicker
        const hideStyle = document.createElement("style")
        hideStyle.id = "global-hide-native-cursor"
        hideStyle.textContent = `
            @media (pointer: fine) {
                html, body, *, *::before, *::after, a, button, input, textarea, select, img, svg, div, span, [role="button"], [tabindex] {
                    cursor: none !important;
                }
            }
        `
        if (!document.getElementById("global-hide-native-cursor")) {
            document.head.appendChild(hideStyle)
        }

        window.addEventListener("mousemove", onMove, { passive: true })
        document.addEventListener("mouseover", onMouseOver, { passive: true })
        document.addEventListener("mouseout", onMouseOut, { passive: true })
        window.addEventListener("mousedown", onDown)
        window.addEventListener("mouseup", onUp)

        return () => {
            window.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseover", onMouseOver)
            document.removeEventListener("mouseout", onMouseOut)
            window.removeEventListener("mousedown", onDown)
            window.removeEventListener("mouseup", onUp)
            if (animFrameId) cancelAnimationFrame(animFrameId)
            setPressed(false)
            const existingStyle = document.getElementById("global-hide-native-cursor")
            if (existingStyle) existingStyle.remove()
        }
    }, [
        isStatic,
        isTouchDevice,
        labelTiltStrength,
        resolvedOffset.x,
        resolvedOffset.y,
        mouseX,
        mouseY,
        labelTiltTarget,
    ])

    const visible = useMemo(() => {
        if (isStatic) return true
        if (isTouchDevice) return false
        return hoveringPicture
    }, [isStatic, isTouchDevice, hoveringPicture])

    const labelTranslateX = useTransform(labelX, (v) => v + resolvedLabelOffset.x)
    const labelTranslateY = useTransform(labelY, (v) => v + resolvedLabelOffset.y)

    const arrowContent: React.ReactNode = useMemo(() => {
        if (typeof arrow === "function") {
            try {
                return (arrow as (c: string) => React.ReactNode)(color)
            } catch {
                return null
            }
        }
        if (arrow !== undefined && arrow !== null) return arrow as React.ReactNode
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", overflow: "visible" }}
            >
                <path
                    d="M 5.8 3.6 Q 4.5 3.2 4.6 4.6 L 10.2 22.6 Q 10.6 23.9 11.7 23.2 L 14.2 16.6 L 21.8 14.7 Q 23.1 14.4 22.6 13.2 L 6.8 3.8 Z"
                    fill={color}
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth={1.6}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        )
    }, [arrow, color, size])

    const activeName = pictureName || defaultName

    const labelContent: React.ReactNode = useMemo(() => {
        if (customLabel !== undefined && customLabel !== null) return customLabel
        return (
            <div
                className={classNames?.labelText}
                style={{
                    color: textColor,
                    fontSize: Math.max(7, size * 0.43),
                    lineHeight: 1.1,
                    fontWeight: 600,
                    fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    whiteSpace: "nowrap",
                    letterSpacing: 0.1,
                }}
            >
                {activeName}
            </div>
        )
    }, [customLabel, activeName, textColor, size, classNames?.labelText])

    if (isTouchDevice) return null

    const layerStyle: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex,
        ...style,
    }

    return (
        <>
            {/* Classic Dot & Circle Cursor */}
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={circleRef} className="cursor-circle"></div>

            {/* Originkit UserCursor on Picture Blocks */}
            <CursorLayer
                layerStyle={layerStyle}
                visible={visible}
                arrowX={arrowX}
                arrowY={arrowY}
                labelX={labelTranslateX}
                labelY={labelTranslateY}
                labelRotation={labelRotation}
                scale={scaleMV}
                showLabel={showLabel}
                hasLabelText={!!(activeName && activeName.trim())}
                color={color}
                size={size}
                arrowContent={arrowContent}
                labelContent={labelContent}
                classNames={classNames}
            />
        </>
    )
}

function CursorLayer(props: {
    layerStyle: React.CSSProperties
    visible: boolean
    arrowX: MotionValue<number>
    arrowY: MotionValue<number>
    labelX: MotionValue<number>
    labelY: MotionValue<number>
    labelRotation: MotionValue<number>
    scale: MotionValue<number>
    showLabel: boolean
    hasLabelText?: boolean
    color: string
    size: number
    arrowContent: React.ReactNode
    labelContent: React.ReactNode
    classNames?: ClassNames
}) {
    const {
        layerStyle,
        visible,
        arrowX,
        arrowY,
        labelX,
        labelY,
        labelRotation,
        scale,
        showLabel,
        hasLabelText = true,
        color,
        size,
        arrowContent,
        labelContent,
        classNames,
    } = props

    return (
        <div style={layerStyle}>
            {showLabel && hasLabelText && (
                <motion.div
                    className={classNames?.label}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        x: labelX,
                        y: labelY,
                        rotate: labelRotation,
                        scale,
                        background: color,
                        borderRadius: 999,
                        padding: `${size * 0.18}px ${size * 0.36}px`,
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
                        opacity: visible ? 1 : 0,
                        transformOrigin: "0% 50%",
                        transition: "opacity 140ms ease",
                        willChange: "transform, opacity",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    {labelContent}
                </motion.div>
            )}

            <motion.div
                className={classNames?.cursor}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    x: arrowX,
                    y: arrowY,
                    scale,
                    width: size,
                    height: size,
                    opacity: visible ? 1 : 0,
                    transformOrigin: "0% 0%",
                    transition: "opacity 140ms ease",
                    willChange: "transform, opacity",
                    pointerEvents: "none",
                }}
            >
                <div
                    className={classNames?.arrow}
                    style={{ width: size, height: size }}
                >
                    {arrowContent}
                </div>
            </motion.div>
        </div>
    )
}

const __originkitPresetProps = {
    size: 31
};

export function UserCursor(props: Record<string, unknown>) {
    return <__OriginkitBase_UserCursor {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}

export const CustomCursor = UserCursor;
export default UserCursor;
