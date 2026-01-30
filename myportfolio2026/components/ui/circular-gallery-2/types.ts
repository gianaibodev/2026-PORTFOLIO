import React from "react";

export interface GalleryItem {
    image: string;
    text: string;
}

export interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: GalleryItem[];
    bend?: number;
    borderRadius?: number;
    scrollSpeed?: number;
    scrollEase?: number;
    fontClassName?: string;
    /** Scale factor for image size (0–1). Smaller = smaller cards. Default 1. Use ~0.55 for mobile. */
    imageScale?: number;
}
