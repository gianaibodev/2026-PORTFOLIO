"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowUpRight, X } from "lucide-react"
import { Project } from "./types"
import { ImageLightbox } from "./ImageLightbox"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

interface FolderPanelProps {
    title: string
    projects: Project[]
    href?: string
    isOpen: boolean
    onClose: () => void
}

export function FolderPanel({ title, projects, href, isOpen, onClose }: FolderPanelProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
    const [hiddenId, setHiddenId] = useState<string | null>(null)
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
    const reduceMotion = useReducedMotion()
    const lightboxOpen = selectedIndex !== null

    useEffect(() => {
        if (!isOpen) return
        lockScroll()
        return () => unlockScroll()
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !lightboxOpen) onClose()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, lightboxOpen, onClose])

    const openProject = useCallback(
        (index: number) => {
            const el = cardRefs.current[index]
            if (el) setSourceRect(el.getBoundingClientRect())
            setSelectedIndex(index)
            setHiddenId(projects[index]?.id ?? null)
        },
        [projects],
    )

    // Folders render only after the client fetch, so document always exists here.
    if (typeof document === "undefined") return null

    return createPortal(
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="folder-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} projects`}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        onClick={onClose}
                    >
                        <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />

                        <motion.div
                            className="relative w-full max-w-5xl"
                            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={reduceMotion ? undefined : { y: 8, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <h3 className="truncate text-lg font-semibold text-foreground">{title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {projects.length} {projects.length === 1 ? "project" : "projects"}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    {href && (
                                        <Link
                                            href={href}
                                            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
                                        >
                                            Category page
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
                                    )}
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        aria-label="Close"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            <ul className="grid grid-cols-3 gap-x-2 gap-y-3 sm:gap-3 lg:grid-cols-5">
                                {projects.map((project, index) => (
                                    <motion.li
                                        key={project.id}
                                        initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.35, delay: 0.05 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <button
                                            type="button"
                                            ref={(el) => {
                                                cardRefs.current[index] = el
                                            }}
                                            onClick={() => openProject(index)}
                                            className="group block w-full text-left"
                                        >
                                            <span
                                                className="relative block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/30 transition-opacity"
                                                style={{ opacity: hiddenId === project.id ? 0 : 1 }}
                                            >
                                                <Image
                                                    src={project.image || "/placeholder.svg"}
                                                    alt={`${project.title} thumbnail`}
                                                    fill
                                                    sizes="(min-width: 1024px) 200px, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                />
                                            </span>
                                            <span className="mt-1.5 block truncate text-xs font-medium text-foreground sm:mt-2 sm:text-sm">
                                                {project.title}
                                            </span>
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ImageLightbox
                projects={projects}
                currentIndex={selectedIndex ?? 0}
                isOpen={lightboxOpen}
                onClose={() => {
                    setSelectedIndex(null)
                    setSourceRect(null)
                }}
                sourceRect={sourceRect}
                onCloseComplete={() => setHiddenId(null)}
                onNavigate={(i) => {
                    setSelectedIndex(i)
                    setHiddenId(projects[i]?.id ?? null)
                }}
            />
        </>,
        document.body,
    )
}
