import { useEffect, useRef } from "react";

type Bubble = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  blur: number;
  color: string;
};

export function HeroBubbles({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "232,180,184",
      "196,124,130",
      "247,232,232",
      "220,160,165",
      "253,217,220",
    ];

    const initBubbles = (w: number, h: number) => {
      bubbles.current = Array.from({ length: 19 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: i < 5 ? Math.random() * 200 + 120 : Math.random() * 60 + 15,
        speedX: (Math.random() - 0.5) * (i < 5 ? 0.3 : 0.7),
        speedY: (Math.random() - 0.5) * (i < 5 ? 0.3 : 0.7),
        opacity: i < 5 ? Math.random() * 0.15 + 0.07 : Math.random() * 0.3 + 0.1,
        blur: i < 5 ? Math.random() * 70 + 50 : Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      initBubbles(w, h);
    };

    // Wait one frame so the container has fully painted and has its real height
    const rafId = requestAnimationFrame(() => {
      resize();
      window.addEventListener("resize", resize);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bubbles.current.forEach((b) => {
          b.x += b.speedX;
          b.y += b.speedY;

          if (b.x - b.size < 0 || b.x + b.size > canvas.width) {
            b.speedX *= -1;
            b.x = Math.max(b.size, Math.min(canvas.width - b.size, b.x));
          }
          if (b.y - b.size < 0 || b.y + b.size > canvas.height) {
            b.speedY *= -1;
            b.y = Math.max(b.size, Math.min(canvas.height - b.size, b.y));
          }

          ctx.save();
          ctx.filter = `blur(${b.blur}px)`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${b.color}, ${b.opacity})`;
          ctx.fill();
          ctx.restore();
        });

        animRef.current = requestAnimationFrame(draw);
      };

      draw();
    });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}