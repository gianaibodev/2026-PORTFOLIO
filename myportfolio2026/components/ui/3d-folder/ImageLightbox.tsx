"use client"

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageLightboxProps } from "./types"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

export function ImageLightbox({
    projects,
    currentIndex,
    isOpen,
    onClose,
    sourceRect,
    onCloseComplete,
    onNavigate,
}: ImageLightboxProps) {
    const router = useRouter()
    const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial")
    const [isClosing, setIsClosing] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const [internalIndex, setInternalIndex] = useState(currentIndex)
    const [prevIndex, setPrevIndex] = useState(currentIndex)
    const [isSliding, setIsSliding] = useState(false)
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
    const containerRef = useRef<HTMLDivElement>(null)

    const totalProjects = projects.length
    const hasNext = internalIndex < totalProjects - 1
    const hasPrev = internalIndex > 0

    const currentProject = projects[internalIndex]
    // const previousProject = projects[prevIndex] // Unused

    useEffect(() => {
        if (isOpen && currentIndex !== internalIndex && !isSliding) {
            const direction = currentIndex > internalIndex ? "left" : "right"
            const prevIdx = internalIndex
            const targetIdx = currentIndex

            setTimeout(() => {
                setSlideDirection(direction)
                setPrevIndex(prevIdx)
                setIsSliding(true)
            }, 0)

            const timer = setTimeout(() => {
                setInternalIndex(targetIdx)
                setIsSliding(false)
            }, 400)

            return () => clearTimeout(timer)
        }
    }, [currentIndex, isOpen, internalIndex, isSliding])

    useEffect(() => {
        if (isOpen) {
            const targetIdx = currentIndex
            setTimeout(() => {
                setInternalIndex(targetIdx)
                setPrevIndex(targetIdx)
                setIsSliding(false)
            }, 0)
        }
    }, [isOpen, currentIndex])

    const navigateNext = useCallback(() => {
        if (internalIndex >= totalProjects - 1 || isSliding) return
        onNavigate(internalIndex + 1)
    }, [internalIndex, totalProjects, isSliding, onNavigate])

    const navigatePrev = useCallback(() => {
        if (internalIndex <= 0 || isSliding) return
        onNavigate(internalIndex - 1)
    }, [internalIndex, isSliding, onNavigate])

    const handleClose = useCallback(() => {
        setIsClosing(true)
        onClose()
        setTimeout(() => {
            setIsClosing(false)
            setShouldRender(false)
            setAnimationPhase("initial")
            onCloseComplete?.()
        }, 400)
    }, [onClose, onCloseComplete])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "Escape") handleClose()
            if (e.key === "ArrowRight") navigateNext()
            if (e.key === "ArrowLeft") navigatePrev()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, handleClose, navigateNext, navigatePrev])

    useEffect(() => {
        if (!isOpen) return
        lockScroll()
        return () => unlockScroll()
    }, [isOpen])

    useLayoutEffect(() => {
        if (isOpen && sourceRect) {
            setTimeout(() => {
                setShouldRender(true)
                setAnimationPhase("initial")
                setIsClosing(false)
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimationPhase("animating")
                    })
                })
            }, 0)
            const timer = setTimeout(() => {
                setAnimationPhase("complete")
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isOpen, sourceRect])

    const handleDotClick = (idx: number) => {
        if (isSliding || idx === internalIndex) return
        onNavigate(idx)
    }

    if (!shouldRender || !currentProject) return null

    const getInitialStyles = (): React.CSSProperties => {
        if (!sourceRect) return {}

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const targetWidth = viewportWidth
        const targetHeight = viewportHeight

        const targetX = (viewportWidth - targetWidth) / 2
        const targetY = (viewportHeight - targetHeight) / 2

        const scaleX = sourceRect.width / targetWidth
        const scaleY = sourceRect.height / targetHeight
        const scale = Math.max(scaleX, scaleY)

        const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2)
        const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2)

        return {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            opacity: 1,
        }
    }

    const getFinalStyles = (): React.CSSProperties => {
        return {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
        }
    }

    const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles()

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center"
            onClick={handleClose}
            style={{
                opacity: isClosing ? 0 : 1,
                transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                className="absolute inset-0 bg-background"
                style={{
                    opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
                    transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            />

            {/* Close button */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                }}
                className={cn(
                    "absolute top-5 right-5 z-50",
                    "w-10 h-10 flex items-center justify-center",
                    "rounded-full bg-muted/50 backdrop-blur-md",
                    "border border-border",
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
                    "transition-all duration-300 ease-out hover:scale-105 active:scale-95",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-10px)",
                    transition: "opacity 300ms ease-out, transform 300ms ease-out",
                }}
            >
                <X className="w-4 h-4" strokeWidth={2.5} />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    navigatePrev()
                }}
                disabled={!hasPrev || isSliding}
                className={cn(
                    "absolute left-4 md:left-8 z-50",
                    "w-12 h-12 flex items-center justify-center",
                    "rounded-full bg-muted/50 backdrop-blur-md",
                    "border border-border",
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
                    "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
                    "disabled:opacity-0 disabled:pointer-events-none",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-20px)",
                    transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
                }}
            >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    navigateNext()
                }}
                disabled={!hasNext || isSliding}
                className={cn(
                    "absolute right-4 md:right-8 z-50",
                    "w-12 h-12 flex items-center justify-center",
                    "rounded-full bg-muted/50 backdrop-blur-md",
                    "border border-border",
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
                    "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
                    "disabled:opacity-0 disabled:pointer-events-none",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(20px)",
                    transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
                }}
            >
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <div
                ref={containerRef}
                className="relative z-10 h-[100dvh] w-full"
                onClick={(e) => e.stopPropagation()}
                style={{
                    ...currentStyles,
                    transform: isClosing ? "translate(0, 0) scale(0.95)" : currentStyles.transform,
                    transition:
                        animationPhase === "initial" && !isClosing
                            ? "none"
                            : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
                    transformOrigin: "center center",
                }}
            >
                <div
                    className="relative flex h-full flex-col overflow-hidden bg-background"
                    style={{
                        borderRadius: animationPhase === "initial" && !isClosing ? "12px" : "0px",
                        transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="relative min-h-0 flex-1 overflow-hidden">
                        <div
                            className="flex h-full transition-transform duration-400 ease-out"
                            style={{
                                transform: `translateX(-${internalIndex * 100}%)`,
                                transition: isSliding ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
                            }}
                        >
                            {projects.map((project, idx) => (
                                <div key={project.id} className="relative h-full w-full flex-shrink-0">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={`${project.title} - Project preview image in lightbox viewer`}
                                        fill
                                        sizes="100vw"
                                        className="object-contain bg-background"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Subtle vignette effect */}
                        
                    </div>

                    <div
                        className="border-t border-border bg-background px-5 py-4 sm:px-8"
                        style={{
                            opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
                            transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
                        }}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium text-foreground tracking-tight truncate h-7">
                                    {currentProject?.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="hidden text-sm text-muted-foreground sm:block">
                                        <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                                            ←
                                        </kbd>
                                        <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                                            →
                                        </kbd>{" "}
                                        to navigate
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        {projects.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleDotClick(idx)}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-all duration-300",
                                                    idx === internalIndex
                                                        ? "bg-foreground scale-110"
                                                        : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    const target = currentProject?.href
                                    if (!target) return
                                    if (/^https?:\/\//.test(target)) {
                                        window.open(target, "_blank", "noopener,noreferrer")
                                    } else {
                                        router.push(target)
                                    }
                                }}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2",
                                    "text-sm font-medium text-muted-foreground",
                                    "bg-muted/50 hover:bg-muted",
                                    "rounded-lg border border-border",
                                    "transition-all duration-200 ease-out",
                                    "hover:text-foreground",
                                    "hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                                )}
                            >
                                <span>{/^https?:\/\//.test(currentProject?.href ?? "") ? "Open site" : "View Case Study"}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
