import React, { useRef, useState, useEffect, useCallback } from 'react'

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   GlitchText â€” Active Theory-style glitch / flicker / RGB channel-split
   Props:
     children  â€” text content
     mode      â€” 'hover' | 'auto' | 'flicker' | 'always'
     intensity â€” 0-1, default 0.7
     tag       â€” HTML element to use, default 'span'
     className â€” passthrough className
     style     â€” passthrough style
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const glitchKeyframes = `
@keyframes glitch-clip-1 {
  0%        { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
  20%       { clip-path: inset(92% 0  1% 0); transform: translate( 3px, 0); }
  40%       { clip-path: inset(43% 0 51% 0); transform: translate(-3px, 0); }
  60%       { clip-path: inset(25% 0 58% 0); transform: translate( 4px, 0); }
  80%       { clip-path: inset(54% 0 36% 0); transform: translate(-2px, 0); }
  100%      { clip-path: inset(58% 0 43% 0); transform: translate( 2px, 0); }
}
@keyframes glitch-clip-2 {
  0%        { clip-path: inset(24% 0 29% 0); transform: translate( 3px, 0); }
  20%       { clip-path: inset(54% 0 21% 0); transform: translate(-4px, 0); }
  40%       { clip-path: inset( 9% 0 72% 0); transform: translate( 2px, 0); }
  60%       { clip-path: inset(70% 0 13% 0); transform: translate(-3px, 0); }
  80%       { clip-path: inset(33% 0 49% 0); transform: translate( 4px, 0); }
  100%      { clip-path: inset(81% 0  7% 0); transform: translate(-2px, 0); }
}
@keyframes glitch-flicker {
  0%,100%   { opacity: 1; }
  18%       { opacity: 0.85; }
  19%       { opacity: 0; }
  20%       { opacity: 0.95; }
  50%       { opacity: 1; }
  72%       { opacity: 0.9; }
  73%       { opacity: 0; }
  74%       { opacity: 1; }
}
`

// Inject styles once
let styleInjected = false
function injectStyles() {
    if (styleInjected || typeof document === 'undefined') return
    const el = document.createElement('style')
    el.textContent = glitchKeyframes
    document.head.appendChild(el)
    styleInjected = true
}

export default function GlitchText({
    children,
    mode = 'hover',
    intensity = 0.7,
    tag: Tag = 'span',
    className = '',
    style = {},
    ...rest
}) {
    injectStyles()

    const [active, setActive] = useState(mode === 'always')
    const timerRef = useRef(null)
    const containerRef = useRef(null)

    // 'auto' mode â€” fires on random interval
    useEffect(() => {
        if (mode !== 'auto') return
        const schedule = () => {
            const delay = 3000 + Math.random() * 5000
            timerRef.current = setTimeout(() => {
                setActive(true)
                setTimeout(() => setActive(false), 200 + Math.random() * 350)
                schedule()
            }, delay)
        }
        schedule()
        return () => clearTimeout(timerRef.current)
    }, [mode])

    // 'flicker' mode â€” rapid fire on mount
    useEffect(() => {
        if (mode !== 'flicker') return
        setActive(true)
        const off = setTimeout(() => setActive(false), 800)
        return () => clearTimeout(off)
    }, [mode])

    const handleEnter = useCallback(() => { if (mode === 'hover') setActive(true) }, [mode])
    const handleLeave = useCallback(() => { if (mode === 'hover') setActive(false) }, [mode])

    const dur = `${0.12 + (1 - intensity) * 0.2}s`

    const baseStyle = {
        position: 'relative',
        display: 'inline-block',
        ...style,
    }

    const pseudoBase = {
        content: `"${typeof children === 'string' ? children : ''}"`,
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
    }

    return (
        <Tag
            ref={containerRef}
            className={`glitch-root ${className}`}
            style={baseStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...rest}
        >
            {children}

            {/* Red channel â€” glitch layer 1 */}
            {active && (
                <span
                    aria-hidden="true"
                    style={{
                        ...pseudoBase,
                        color: '#ff003c',
                        mixBlendMode: 'screen',
                        animation: `glitch-clip-1 ${dur} steps(1) infinite`,
                        opacity: intensity,
                    }}
                >
                    {children}
                </span>
            )}

            {/* Blue channel â€” glitch layer 2 */}
            {active && (
                <span
                    aria-hidden="true"
                    style={{
                        ...pseudoBase,
                        color: '#00f7ff',
                        mixBlendMode: 'screen',
                        animation: `glitch-clip-2 ${dur} steps(1) infinite`,
                        animationDelay: `${dur}`,
                        opacity: intensity * 0.85,
                    }}
                >
                    {children}
                </span>
            )}

            {/* CRT scanline noise bar â€” fires on strong glitch */}
            {active && intensity > 0.5 && (
                <span
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: `${20 + Math.random() * 60}%`,
                        left: 0, right: 0,
                        height: `${1 + Math.random() * 3}px`,
                        background: 'rgba(125,211,252,0.35)',
                        transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </Tag>
    )
}





