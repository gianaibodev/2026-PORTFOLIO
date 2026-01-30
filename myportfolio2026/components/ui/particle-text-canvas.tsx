"use client";

import React, { useRef, useEffect } from "react";

interface MousePosition {
  x: number | undefined;
  y: number | undefined;
  radius: number;
}

interface ParticleTextProps {
  hideInteractionHint?: boolean;
}

const ParticleText = ({ hideInteractionHint = false }: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<MousePosition>({ x: undefined, y: undefined, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      color: string;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 2;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 40 + 5;
      }

      draw() {
        if (!context) return;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }

      update() {
        if (mouse.current.x === undefined || mouse.current.y === undefined) {
          const deltaX = this.x - this.baseX;
          const deltaY = this.y - this.baseY;
          this.x -= deltaX / 10;
          this.y -= deltaY / 10;
          return;
        }

        const deltaX = (mouse.current.x as number) - this.x;
        const deltaY = (mouse.current.y as number) - this.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const forceDirectionX = deltaX / distance;
        const forceDirectionY = deltaY / distance;
        let force = (mouse.current.radius - distance) / mouse.current.radius;
        if (force < 0) force = 0;

        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    /**
     * Initializes the particle system by analyzing pixel data from drawn text.
     */
    function init() {
      if (!context || !canvas) return;
      particlesArray = [];
      const text = "Loading";
      const fontSize = Math.min(window.innerWidth / 6, 200);
      const textX = canvas.width / 2;
      const textY = canvas.height / 2;

      context.font = `bold ${fontSize}px "Arial Black", Gadget, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0.2, "#41d1ff");
      gradient.addColorStop(0.5, "#41a9ff");
      gradient.addColorStop(0.8, "#61dafb");
      context.fillStyle = gradient;

      context.fillText(text, textX, textY);
      const textCoordinates = context.getImageData(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < textCoordinates.height; y += 4) {
        for (let x = 0; x < textCoordinates.width; x += 4) {
          const alphaIndex = y * 4 * textCoordinates.width + x * 4 + 3;
          if (textCoordinates.data[alphaIndex] > 128) {
            const red = textCoordinates.data[alphaIndex - 3];
            const green = textCoordinates.data[alphaIndex - 2];
            const blue = textCoordinates.data[alphaIndex - 1];
            const color = `rgb(${red},${green},${blue})`;
            particlesArray.push(new Particle(x, y, color));
          }
        }
      }
    }

    /**
     * Animation loop for updating and drawing particles.
     */
    function animate() {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.draw();
        particle.update();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        width: "100dvw",
        minHeight: "100dvh",
        height: "100dvh",
        background: "#0a0f18",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }}></canvas>
      {!hideInteractionHint && (
        <div
          className="particle-loading-hint"
          style={{
            position: "absolute",
            bottom: "4%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(65, 169, 255, 0.9)",
            fontSize: "14px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10000,
            fontWeight: 500,
            letterSpacing: "0.5px",
            textShadow: "0 2px 10px rgba(65, 169, 255, 0.3)",
            maxWidth: "90%",
          }}
        >
          <span className="hidden sm:inline">Move your mouse to interact</span>
          <span className="sm:hidden">Touch and move to interact</span>
        </div>
      )}
    </div>
  );
};

export default ParticleText;

