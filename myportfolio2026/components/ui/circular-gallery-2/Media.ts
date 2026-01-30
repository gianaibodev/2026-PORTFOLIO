import { Mesh, OGLRenderingContext, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { Title } from "./Title";

interface MediaParams {
    geometry: Plane;
    gl: OGLRenderingContext;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    text: string;
    viewport: { width: number; height: number };
    bend: number;
    textColor: string;
    borderRadius?: number;
    font: string;
    imageScale?: number;
}

/**
 * Represents a single media item (image + title) in the 3D gallery.
 * Handles shader creation, mesh positioning, and scroll updates.
 */
export class Media {
    gl: OGLRenderingContext;
    geometry: Plane;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    text: string;
    viewport: { width: number; height: number };
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    imageScale: number;
    program!: Program;
    plane!: Mesh;
    title!: Title;

    /** Offset used for infinite scrolling wrapping */
    wrapOffset: number = 0;
    /** Total width of all gallery items combined */
    totalGalleryWidth: number = 0;
    /** Width of a single item including padding */
    itemWidth: number = 0;
    /** Initial X position based on index */
    initialX: number = 0;

    scale: number = 1;
    padding: number = 2;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;

    constructor({
        geometry,
        gl,
        image,
        index,
        length,
        renderer,
        scene,
        screen,
        text,
        viewport,
        bend,
        textColor,
        borderRadius = 0,
        font,
        imageScale = 1,
    }: MediaParams) {
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.text = text;
        this.viewport = viewport;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.imageScale = imageScale;
        this.createShader();
        this.createMesh();
        this.createTitle();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: true,
        });
        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          // Vertex displacement for "jelly" effect
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          // Calculate Aspect Ratio to cover the plane
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply Rounded Corners via SDF
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius },
            },
            transparent: true,
        });

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.program.uniforms.uImageSizes.value = [
                img.naturalWidth,
                img.naturalHeight,
            ];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program,
        });
        this.plane.setParent(this.scene);
    }

    createTitle() {
        this.title = new Title({
            gl: this.gl,
            plane: this.plane,
            renderer: this.renderer,
            text: this.text,
            textColor: this.textColor,
            font: this.font,
        });
    }

    update(
        scroll: { current: number; last: number },
        direction: "left" | "right",
    ) {
        this.plane.position.x = this.initialX - scroll.current - this.wrapOffset;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        // Apply bending (curve) logic
        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);
            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);

            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

        if (direction === "right" && this.isBefore) {
            this.wrapOffset -= this.totalGalleryWidth;
            this.isBefore = this.isAfter = false;
        }
        if (direction === "left" && this.isAfter) {
            this.wrapOffset += this.totalGalleryWidth;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize(
        {
            screen,
            viewport,
        }: {
            screen?: { width: number; height: number };
            viewport?: { width: number; height: number };
        } = {},
    ) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            if ((this.plane.program.uniforms as Record<string, unknown>).uViewportSizes) {
                (
                    this.plane.program.uniforms as Record<string, { value: number[] }>
                ).uViewportSizes.value = [this.viewport.width, this.viewport.height];
            }
        }
        this.scale = (this.screen.height / 1500) * this.imageScale;
        this.plane.scale.y =
            (this.viewport.height * (900 * this.scale)) / this.screen.height;
        this.plane.scale.x =
            (this.viewport.width * (700 * this.scale)) / this.screen.width;
        this.program.uniforms.uPlaneSizes.value = [
            this.plane.scale.x,
            this.plane.scale.y,
        ];
        this.padding = 2;
        this.itemWidth = this.plane.scale.x + this.padding;
        this.totalGalleryWidth = this.itemWidth * this.length;
        this.initialX = this.itemWidth * this.index;
    }
}
