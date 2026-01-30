import { Mesh, OGLRenderingContext, Plane, Program, Renderer } from "ogl";
import { autoBind, createTextTexture } from "./utils";

interface TitleParams {
    gl: OGLRenderingContext;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor: string;
    font: string;
}

/**
 * Represents the text title associated with a gallery item.
 * Manages the creation and rendering of the text mesh.
 */
export class Title {
    gl: OGLRenderingContext;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor: string;
    font: string;
    mesh!: Mesh;

    constructor({ gl, plane, renderer, text, textColor, font }: TitleParams) {
        autoBind(this);
        this.gl = gl;
        this.plane = plane;
        this.renderer = renderer;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.createMesh();
    }

    createMesh() {
        const { texture, width, height } = createTextTexture(
            this.gl,
            this.text,
            this.font,
            this.textColor,
        );
        const geometry = new Plane(this.gl);
        const program = new Program(this.gl, {
            vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
            uniforms: { tMap: { value: texture } },
            transparent: true,
        });
        this.mesh = new Mesh(this.gl, { geometry, program });
        const aspect = width / height;
        const textHeight = this.plane.scale.y * 0.15;
        const textWidth = textHeight * aspect;
        this.mesh.scale.set(textWidth, textHeight, 1);
        this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
        this.mesh.setParent(this.plane);
    }
}
