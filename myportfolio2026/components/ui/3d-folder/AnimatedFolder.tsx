"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimatedFolderProps } from "./types"
import { ProjectCard } from "./ProjectCard"
import { FolderPanel } from "./FolderPanel"

export function AnimatedFolder({ title, projects, className, color, href, isPinned = false }: AnimatedFolderProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const toGlassTint = (c?: string, alpha = 0.22) => {
        const base = c ?? (isDark ? "hsl(217, 70%, 50%)" : "hsl(217, 91%, 60%)")
        return base.replace("hsl(", "hsla(").replace(")", `,${alpha})`)
    }

    const folderBackColor = toGlassTint(color, 0.45)
    const folderFrontColor = toGlassTint(color, 0.55)
    const folderTabColor = toGlassTint(color, 0.65)
    const folderGlowColor = toGlassTint(color, 0.30)

    const openPanel = () => {
        setIsHovered(false)
        setIsPanelOpen(true)
    }

    return (
        <>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    "p-4 sm:p-6 md:p-8 rounded-2xl cursor-pointer",
                    "border border-black/5 dark:border-white/[0.12]",
                    "transition-all duration-500 ease-out",
                    "hover:border-white/20 dark:hover:border-white/20",
                    "group",
                    "w-full max-w-sm overflow-visible",
                    className,
                )}
                style={{
                    minWidth: "min(280px, 100%)",
                    maxWidth: "100%",
                    minHeight: "320px",
                    perspective: "1000px",
                    backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015)), radial-gradient(circle at 50% 20%, ${folderGlowColor}, transparent 50%)`,
                    zIndex: isHovered ? 40 : 1, // Increase z-index on hover
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={openPanel}
                role="button"
                tabIndex={0}
                aria-label={`Open ${title}, ${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openPanel()
                    }
                }}
            >
                {/* Backdrop blur layer - moved here to prevent clipping children in Safari */}
                <div className="absolute inset-0 rounded-2xl backdrop-blur-2xl bg-white/22 dark:bg-white/[0.065] -z-10 pointer-events-none" />

                {/* Subtle background glow on hover */}
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                    style={{
                        background: "radial-gradient(circle at 50% 70%, hsl(var(--accent)) 0%, transparent 70%)",
                        opacity: isHovered ? 0.03 : 0,
                    }}
                />

                <div className="relative flex items-center justify-center mb-4" style={{ height: "160px", width: "200px", position: "relative", overflow: "visible" }}>
                    {/* Folder back layer - z-index 10 */}
                    <div
                        className="absolute rounded-lg backdrop-blur-lg"
                        style={{
                            width: "128px",
                            height: "96px",
                            left: "50%",
                            top: "50%",
                            marginLeft: "-64px",
                            marginTop: "-48px",
                            backgroundColor: folderBackColor,
                            border: "1px solid rgba(255,255,255,0.14)",
                            transform: isHovered
                                ? "translateY(0) rotateX(-15deg)"
                                : "translateY(0) rotateX(0deg)",
                            transformOrigin: "bottom center",
                            transformStyle: "preserve-3d",
                            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 10,
                            opacity: 1,
                        }}
                    />

                    {/* Folder tab - z-index 10 */}
                    <div
                        className="absolute rounded-t-md backdrop-blur-lg"
                        style={{
                            width: "48px",
                            height: "16px",
                            top: "calc(50% - 48px - 12px)",
                            left: "calc(50% - 64px + 16px)",
                            backgroundColor: folderTabColor,
                            border: "1px solid rgba(255,255,255,0.16)",
                            transformOrigin: "bottom center",
                            transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
                            transformStyle: "preserve-3d",
                            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 10,
                            opacity: 1,
                        }}
                    />

                    {/* Project cards - z-index 20, between back and front */}
                    <div
                        className="absolute"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 20,
                        }}
                    >
                        {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                image={project.image}
                                title={project.title}
                                delay={index * 80}
                                isVisible={isHovered}
                                index={index}
                                onClick={openPanel}
                                isSelected={false}
                            />
                        ))}
                    </div>

                    {/* Folder front layer - z-index 30 */}
                    <div
                        className="absolute rounded-lg backdrop-blur-lg"
                        style={{
                            width: "128px",
                            height: "96px",
                            left: "50%",
                            top: "calc(50% - 48px + 4px)",
                            marginLeft: "-64px",
                            backgroundColor: folderFrontColor,
                            border: "1px solid rgba(255,255,255,0.16)",
                            transform: isHovered
                                ? "translateY(0) rotateX(25deg) translateY(8px)"
                                : "translateY(0) rotateX(0deg)",
                            transformOrigin: "bottom center",
                            transformStyle: "preserve-3d",
                            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 30,
                            opacity: 1,
                        }}
                    />

                    {/* Folder shine effect - z-index 31 */}
                    <div
                        className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
                        style={{
                            left: "50%",
                            top: "calc(50% - 48px + 4px)",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 50%)",
                            transformOrigin: "bottom center",
                            transform: isHovered
                                ? "translateX(-50%) rotateX(25deg) translateY(8px)"
                                : "translateX(-50%) rotateX(0deg)",
                            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 31,
                        }}
                    />
                </div>

                {/* Folder title */}
                <h3
                    className="text-lg font-semibold text-foreground mt-4 transition-all duration-300 z-40 relative flex items-center gap-2"
                    style={{
                        transform: isHovered ? "translateY(4px)" : "translateY(0)",
                    }}
                >
                    {isPinned && (
                        <Star
                            className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0"
                            aria-label="Featured category"
                        />
                    )}
                    {title}
                </h3>

                {/* Project count */}
                <p
                    className="text-sm text-muted-foreground transition-all duration-300 z-40 relative mb-4"
                    style={{
                        opacity: isHovered ? 0.7 : 1,
                    }}
                >
                    {projects.length} {projects.length === 1 ? "project" : "projects"}
                </p>

                {/* Hover hint - responsive text */}
                <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300"
                    style={{
                        opacity: isHovered ? 0 : 0.6,
                        transform: isHovered ? "translateY(10px)" : "translateY(0)",
                    }}
                >
                    <span className="hidden md:inline">Click to open</span>
                    <span className="md:hidden">Tap to open</span>
                </div>
            </div>

            <FolderPanel
                title={title}
                projects={projects}
                href={href}
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </>
    )
}
