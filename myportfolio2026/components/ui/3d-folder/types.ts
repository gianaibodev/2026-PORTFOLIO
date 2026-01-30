export interface Project {
    id: string
    image: string
    title: string
}

export interface AnimatedFolderProps {
    title: string
    projects: Project[]
    className?: string
    color?: string
    href?: string
    isPinned?: boolean
}

export interface ImageLightboxProps {
    projects: Project[]
    currentIndex: number
    isOpen: boolean
    onClose: () => void
    sourceRect: DOMRect | null
    onCloseComplete?: () => void
    onNavigate: (index: number) => void
}

export interface ProjectCardProps {
    image: string
    title: string
    delay: number
    isVisible: boolean
    index: number
    onClick: () => void
    isSelected: boolean
}
