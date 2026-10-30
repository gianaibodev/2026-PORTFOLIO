export interface ShaderCredit {
  name: string;
  author: string;
  source: string;
  license?: string;
  description: string;
}

export interface LibraryCredit {
  name: string;
  version: string;
  author: string;
  license: string;
  purpose: string;
  url?: string;
}

export const shaderCredits: ShaderCredit[] = [
  {
    name: "MeshGradient & Dithering",
    author: "Paper Design",
    source: "@paper-design/shaders-react",
    description: "Dynamic multi-color mesh gradients combined with an overlay dithering pass to create a unique pixel-art editorial header.",
    license: "MIT"
  },
  {
    name: "Adaptive Wave Shader",
    author: "Community Open Source",
    source: "GLSL Fragment Shader",
    description: "A noise-based wave system used for the hero background, dynamically interpolating between light and dark modes.",
    license: "Open Source"
  },
  {
    name: "Gallery Distortion Shader",
    author: "OGL Library Community",
    source: "OGL Pipeline",
    description: "Interactive wave distortions implemented via the Object-Oriented Graphics Library for high-performance 3D gallery effects.",
    license: "MIT"
  }
];

export const libraryCredits: LibraryCredit[] = [
  {
    name: "Next.js 16",
    version: "16.4.3",
    author: "Vercel",
    license: "MIT",
    purpose: "Framework for performance-critical routing and efficient server-side rendering.",
    url: "https://nextjs.org"
  },
  {
    name: "OGL",
    version: "1.0.11",
    author: "Nathan Gordon",
    license: "Unlicense",
    purpose: "Minimal WebGL library running the hero shader and the travel gallery.",
    url: "https://github.com/oframe/ogl"
  },
  {
    name: "Framer Motion",
    version: "12.23.26",
    author: "Framer",
    license: "MIT",
    purpose: "Declarative orchestration of physics-based UI interaction.",
    url: "https://framer.com/motion"
  }
];

