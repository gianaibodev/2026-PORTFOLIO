"use client";

import { Mesh, Plane, Program, Renderer, Transform } from "ogl";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { isLowEndDevice } from "@/lib/device-performance";

const vertexShader = `
  // three's ShaderMaterial injected these declarations automatically; ogl does
  // not, so they are spelled out here. The body is otherwise unchanged.
  attribute vec3 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform float u_dark;

  vec2 toPolar(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);
    vec2 polar = toPolar(p);
    float r = polar.x;
    float a = polar.y;
    vec2 i = p;
    float c = 0.0;
    float rot = r + u_time + p.x * 0.100;
    for (float n = 0.0; n < 4.0; n++) {
      float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
      p *= mat2(cos(rot - sin(u_time / 10.0)), sin(rot), -sin(cos(rot) - u_time / 10.0), cos(rot)) * -0.25;
      float t = r - u_time / (n + 30.0);
      i -= p + sin(t - i.y) + rr;
      c += 2.2 / length(vec2((sin(i.x + t) / 0.15), (cos(i.y + t) / 0.15)));
    }
    c /= 8.0;
    vec3 darkBg = vec3(0.02, 0.05, 0.08);
    vec3 darkWave = vec3(0.2, 0.5, 0.7);
    vec3 lightBg = vec3(0.95, 0.98, 1.0);
    vec3 lightWave = vec3(0.4, 0.7, 1.0);
    vec3 bgColor = mix(lightBg, darkBg, u_dark);
    vec3 waveColor = mix(lightWave, darkWave, u_dark);
    float intensity = smoothstep(0.0, 1.0, c * 0.6);
    vec3 finalColor = mix(bgColor, waveColor, intensity);
    fragColor = vec4(finalColor, 1.0);
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`;

function HeroShaderCanvas({
  isDark,
  dpr,
  active,
}: {
  isDark: boolean;
  dpr: number;
  active: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<{
    renderer: Renderer;
    program: Program;
    scene: Transform;
    resize: () => void;
  } | null>(null);

  // Build the context once. dpr, theme and play/pause are handled below
  // without tearing down the GL context.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.classList.add("hero-shader-canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const scene = new Transform();
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: [1, 1, 1] },
        u_dark: { value: isDark ? 1 : 0 },
      },
      depthTest: false,
      depthWrite: false,
      cullFace: false,
    });
    const mesh = new Mesh(gl, {
      geometry: new Plane(gl, { width: 2, height: 2 }),
      program,
    });
    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      // Only the aspect ratio matters to the shader, which divides by .y
      program.uniforms.u_resolution.value = [w, h, 1];
      renderer.render({ scene });
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    glRef.current = { renderer, program, scene, resize };

    // Draw one frame immediately. The animation loop only runs while the hero
    // is on screen and the tab is focused, so without this the backdrop would
    // be blank for anyone who loads the page in a background tab, or who has
    // already scrolled past by the time the canvas mounts.
    renderer.render({ scene });

    return () => {
      ro.disconnect();
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      glRef.current = null;
    };
  }, []);

  useEffect(() => {
    const state = glRef.current;
    if (!state) return;
    state.renderer.dpr = dpr;
    state.resize();
    state.renderer.render({ scene: state.scene });
  }, [dpr]);

  // Theme flips a uniform rather than rebuilding the context.
  useEffect(() => {
    const state = glRef.current;
    if (!state) return;
    state.program.uniforms.u_dark.value = isDark ? 1 : 0;
    state.renderer.render({ scene: state.scene });
  }, [isDark]);

  // Off-screen or backgrounded means no rAF at all, not a loop that early-returns.
  useEffect(() => {
    const state = glRef.current;
    if (!state || !active) return;

    let raf = 0;
    let last = performance.now();
    let elapsed = state.program.uniforms.u_time.value * 2;

    const frame = (now: number) => {
      elapsed += (now - last) / 1000;
      last = now;
      state.program.uniforms.u_time.value = elapsed * 0.5;
      state.renderer.render({ scene: state.scene });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [active]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

/**
 * The animated backdrop behind the hero. It only decorates: the hero's text is
 * server-rendered separately, so nothing depends on this loading, and low-end
 * devices keep the static gradient underneath instead.
 */
export default function HeroShader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (isLowEndDevice()) return;
    setDpr(Math.min(window.devicePixelRatio || 1, 1.5));

    // Hold the canvas back until the page has painted and gone idle.
    let idle = 0;
    const timer = window.setTimeout(() => {
      if (window.requestIdleCallback) idle = window.requestIdleCallback(() => setReady(true));
      else setReady(true);
    }, 500);
    return () => {
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback?.(idle);
    };
  }, []);

  // Halt the loop when the hero is off screen or the tab is hidden.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    let inView = true;
    const sync = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" }
    );
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready]);

  return (
    <div ref={rootRef} className="absolute inset-0">
      {ready && <HeroShaderCanvas isDark={resolvedTheme !== "light"} dpr={dpr} active={active} />}
    </div>
  );
}
