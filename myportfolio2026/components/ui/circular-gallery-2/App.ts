import { Camera, OGLRenderingContext, Plane, Renderer, Transform } from "ogl";
import { Media } from "./Media";
import { GalleryItem } from "./types";
import { autoBind, debounce, lerp } from "./utils";

interface AppParams {
    items?: GalleryItem[];
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    scrollSpeed: number;
    scrollEase: number;
    imageScale?: number;
}

/**
 * Main application class for the Circular Gallery.
 * Orchestrates the WebGL renderer, camera, scene, and interaction events.
 */
export class App {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: { ease: number; current: number; target: number; last: number; position?: number };
    onCheckDebounce: () => void;
    renderer!: Renderer;
    gl!: OGLRenderingContext;
    camera!: Camera;
    scene!: Transform;
    planeGeometry!: Plane;
    mediasImages!: GalleryItem[];
    medias!: Media[];
    isTouchActive: boolean = false;
    touchStartX: number = 0;
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    raf!: number;

    // Bound event listeners
    boundOnResize!: () => void;
    boundOnWheel!: (e: WheelEvent) => void;
    boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchUp!: () => void;

    constructor(
        container: HTMLElement,
        {
            items,
            bend,
            textColor,
            borderRadius,
            font,
            scrollSpeed,
            scrollEase,
            imageScale = 1,
        }: AppParams,
    ) {
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

        autoBind(this);

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMediaItems(items, bend, textColor, borderRadius, font, imageScale);
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2),
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100,
        });
    }

    createMediaItems(
        items: GalleryItem[] | undefined,
        bend: number,
        textColor: string,
        borderRadius: number,
        font: string,
        imageScale: number = 1,
    ) {
        const defaultItems: GalleryItem[] = [
            { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: "Bridge" },
            {
                image: `https://picsum.photos/seed/2/800/600?grayscale`,
                text: "Desk Setup",
            },
            {
                image: `https://picsum.photos/seed/3/800/600?grayscale`,
                text: "Waterfall",
            },
        ];

        const galleryItems = items && items.length > 0 ? items : defaultItems;
        this.mediasImages = [...galleryItems, ...galleryItems];
        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                text: data.text,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font,
                imageScale,
            });
        });
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isTouchActive = true;
        this.scroll.position = this.scroll.current;
        this.touchStartX = "touches" in e ? e.touches[0].clientX : e.clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isTouchActive) return;
        const x = "touches" in e ? e.touches[0].clientX : e.clientX;
        const distance = (this.touchStartX - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position || 0) + distance;
    }

    onTouchUp() {
        this.isTouchActive = false;
        this.onCheck();
    }

    onWheel(e: WheelEvent) {
        const delta = e.deltaY || (e as unknown as { wheelDelta?: number }).wheelDelta || (e as unknown as { detail?: number }).detail || 0;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].itemWidth;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        if (!this.container) return; // Guard against missing container
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
        };
        if (this.renderer) this.renderer.setSize(this.screen.width, this.screen.height);
        if (this.camera) {
            this.camera.perspective({
                aspect: this.screen.width / this.screen.height,
            });
            const fov = (this.camera.fov * Math.PI) / 180;
            const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
            const width = height * this.camera.aspect;
            this.viewport = { width, height };
        }
        if (this.medias) {
            this.medias.forEach((media) =>
                media.onResize({ screen: this.screen, viewport: this.viewport }),
            );
        }
    }

    update() {
        this.scroll.current = lerp(
            this.scroll.current,
            this.scroll.target,
            this.scroll.ease,
        );
        const direction = this.scroll.current > this.scroll.last ? "right" : "left";
        if (this.medias) {
            this.medias.forEach((media) => media.update(this.scroll, direction));
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render({ scene: this.scene, camera: this.camera });
        }
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);

        window.addEventListener("resize", this.boundOnResize);
        window.addEventListener("mousewheel", this.boundOnWheel as EventListener);
        window.addEventListener("wheel", this.boundOnWheel);
        this.container.addEventListener("mousedown", this.boundOnTouchDown);
        window.addEventListener("mousemove", this.boundOnTouchMove as EventListener);
        window.addEventListener("mouseup", this.boundOnTouchUp);
        this.container.addEventListener("touchstart", this.boundOnTouchDown);
        window.addEventListener("touchmove", this.boundOnTouchMove as EventListener, { passive: true });
        window.addEventListener("touchend", this.boundOnTouchUp, { passive: true });
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener("resize", this.boundOnResize);
        window.removeEventListener("mousewheel", this.boundOnWheel as EventListener);
        window.removeEventListener("wheel", this.boundOnWheel);
        this.container.removeEventListener("mousedown", this.boundOnTouchDown);
        window.removeEventListener("mousemove", this.boundOnTouchMove as EventListener);
        window.removeEventListener("mouseup", this.boundOnTouchUp);
        this.container.removeEventListener("touchstart", this.boundOnTouchDown);
        window.removeEventListener("touchmove", this.boundOnTouchMove as EventListener);
        window.removeEventListener("touchend", this.boundOnTouchUp);

        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
        }
    }
}
