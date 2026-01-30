import { OGLRenderingContext, Texture } from "ogl";

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A debounced version of the function.
 */
export function debounce(func: (...args: unknown[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Linear interpolation between two values.
 * @param start The starting value.
 * @param end The ending value.
 * @param t The interpolation factor (0-1).
 * @returns The interpolated value.
 */
export function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
}

/**
 * Automatically binds all methods of a class instance to the instance itself.
 * @param instance The class instance.
 */
export function autoBind(instance: object) {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach((key) => {
        if (key !== "constructor") {
            const value = (instance as Record<string, unknown>)[key];
            if (typeof value === "function") {
                (instance as Record<string, unknown>)[key] = value.bind(instance);
            }
        }
    });
}

/**
 * Creates a texture from a text string using an off-screen canvas.
 * @param gl The OGL rendering context.
 * @param text The text to render.
 * @param font The font style string.
 * @param color The text color.
 * @returns An object containing the texture, width, and height.
 */
export function createTextTexture(
    gl: OGLRenderingContext,
    text: string,
    font: string,
    color: string,
) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
    canvas.width = textWidth + 20;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
}
