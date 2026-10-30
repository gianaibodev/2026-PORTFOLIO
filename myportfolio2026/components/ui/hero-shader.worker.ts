/// <reference lib="webworker" />

// The hero backdrop renders here so that creating the GL context, compiling
// the shader and drawing frames never block the page's main thread.

const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
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

let gl: WebGLRenderingContext | null = null;
let uTime: WebGLUniformLocation | null = null;
let uResolution: WebGLUniformLocation | null = null;
let uDark: WebGLUniformLocation | null = null;
let width = 1;
let height = 1;
let dpr = 1;
let dark = 1;
let elapsed = 0;
let last = 0;
let raf = 0;
let slowFrames = 0;

function draw() {
  if (!gl) return;
  gl.uniform1f(uTime, elapsed * 0.5);
  gl.uniform1f(uDark, dark);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function resize() {
  if (!gl) return;
  const canvas = gl.canvas as OffscreenCanvas;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  gl.viewport(0, 0, canvas.width, canvas.height);
  // Only the aspect ratio matters to the shader, which divides by .y
  gl.uniform3f(uResolution, width, height, 1);
  draw();
}

function frame(now: number) {
  const delta = now - last;
  last = now;
  elapsed += delta / 1000;
  // If the GPU cannot hold frame rate, trade resolution rather than smoothness.
  slowFrames = delta > 24 && delta < 200 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
  if (slowFrames > 20 && dpr > 0.6) {
    dpr = 0.6;
    resize();
  }
  draw();
  raf = requestAnimationFrame(frame);
}

function compile(context: WebGLRenderingContext, type: number, source: string) {
  const shader = context.createShader(type)!;
  context.shaderSource(shader, source);
  context.compileShader(shader);
  return shader;
}

function init(canvas: OffscreenCanvas) {
  gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  }) as WebGLRenderingContext | null;
  if (!gl) return;

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  uTime = gl.getUniformLocation(program, "u_time");
  uResolution = gl.getUniformLocation(program, "u_resolution");
  uDark = gl.getUniformLocation(program, "u_dark");
  resize();
}

self.onmessage = ({ data }) => {
  if (data.canvas) init(data.canvas);
  if (data.width) {
    width = data.width;
    height = data.height;
    resize();
  }
  if (data.dark !== undefined) {
    dark = data.dark;
    draw();
  }
  if (data.active !== undefined) {
    cancelAnimationFrame(raf);
    if (data.active && gl) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
};
