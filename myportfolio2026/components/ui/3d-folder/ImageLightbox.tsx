"use client"

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageLightboxProps } from "./types"

export function ImageLightbox({
    projects,
    currentIndex,
    isOpen,
    onClose,
    sourceRect,
    onCloseComplete,
    onNavigate,
}: ImageLightboxProps) {
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
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [isOpen, handleClose, navigateNext, navigatePrev])

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
        const targetWidth = Math.min(768, viewportWidth - 64)
        const targetHeight = Math.min(viewportHeight * 0.85, 600)

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
            className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8")}
            onClick={handleClose}
            style={{
                opacity: isClosing ? 0 : 1,
                transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
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
                className="relative z-10 w-full max-w-3xl"
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
                    className={cn("relative overflow-hidden", "rounded-2xl", "bg-card", "ring-1 ring-border", "shadow-2xl")}
                    style={{
                        borderRadius: animationPhase === "initial" && !isClosing ? "8px" : "16px",
                        transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-400 ease-out"
                            style={{
                                transform: `translateX(-${internalIndex * 100}%)`,
                                transition: isSliding ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
                            }}
                        >
                            {projects.map((project, idx) => (
                                <div key={project.id} className="relative w-full h-[400px] md:h-[600px] flex-shrink-0">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={`${project.title} - Project preview image in lightbox viewer`}
                                        fill
                                        className="object-contain bg-background"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Subtle vignette effect */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/20 via-transparent to-card/10" />
                    </div>

                    <div
                        className={cn("px-6 py-5", "bg-card", "border-t border-border")}
                        style={{
                            opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
                            transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium text-foreground tracking-tight truncate h-7">
                                    {currentProject?.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm text-muted-foreground">
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
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2",
                                    "text-sm font-medium text-muted-foreground",
                                    "bg-muted/50 hover:bg-muted",
                                    "rounded-lg border border-border",
                                    "transition-all duration-200 ease-out",
                                    "hover:text-foreground",
                                )}
                            >
                                <span>View</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
