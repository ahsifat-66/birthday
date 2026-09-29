import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number;
}

interface ShootingSparkle {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  decay: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initSparkles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = (e.touches[0].clientX - width / 2) / (width / 2);
        mouseRef.current.targetY = (e.touches[0].clientY - height / 2) / (height / 2);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Sparkle colors matching white & pink palette
    const colors = [
      'rgba(244, 63, 110,',   // rose pink
      'rgba(251, 113, 147,',  // soft blush
      'rgba(236, 72, 153,',   // cherry blossom
      'rgba(192, 132, 252,',  // gentle lavender pink
      'rgba(253, 186, 116,',  // warm peach gold
    ];

    let sparkles: SparkleParticle[] = [];

    const initSparkles = () => {
      sparkles = [];
      const count = Math.floor((width * height) / 4500);
      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.8 + 0.2;
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 * depth + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth,
        });
      }
    };

    initSparkles();

    // Shooting sparkles
    const shootingSparkles: ShootingSparkle[] = [];
    let nextShootingTime = Date.now() + 2000;

    const spawnShootingSparkle = () => {
      shootingSparkles.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 100 + 70,
        speed: Math.random() * 10 + 8,
        angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
        alpha: 0.9,
        decay: Math.random() * 0.015 + 0.01,
        color: Math.random() > 0.5 ? 'rgba(244, 63, 110,' : 'rgba(251, 113, 147,',
      });
      nextShootingTime = Date.now() + Math.random() * 4000 + 3500;
    };

    // Pastel pink & white atmospheric glowing clouds
    const clouds = [
      { x: 0.15, y: 0.2, r: 0.45, color1: 'rgba(255, 204, 218, 0.45)', color2: 'rgba(255, 248, 250, 0)' },
      { x: 0.82, y: 0.25, r: 0.5, color1: 'rgba(254, 226, 236, 0.5)', color2: 'rgba(255, 248, 250, 0)' },
      { x: 0.5, y: 0.65, r: 0.55, color1: 'rgba(253, 215, 228, 0.4)', color2: 'rgba(255, 248, 250, 0)' },
      { x: 0.88, y: 0.8, r: 0.42, color1: 'rgba(249, 168, 212, 0.35)', color2: 'rgba(255, 248, 250, 0)' },
      { x: 0.12, y: 0.85, r: 0.4, color1: 'rgba(244, 114, 182, 0.3)', color2: 'rgba(255, 248, 250, 0)' },
    ];

    let time = 0;

    const render = () => {
      time += 0.015;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Pearlescent White & Blush Base Gradient
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#fffbfd');
      baseGrad.addColorStop(0.35, '#fff0f4');
      baseGrad.addColorStop(0.7, '#ffeaf0');
      baseGrad.addColorStop(1, '#fff5f8');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Luminous Pastel Clouds
      clouds.forEach((cloud, idx) => {
        const driftX = Math.sin(time * 0.35 + idx) * 30;
        const driftY = Math.cos(time * 0.3 + idx * 1.4) * 25;
        const cx = cloud.x * width + driftX + mouseRef.current.x * 20;
        const cy = cloud.y * height + driftY + mouseRef.current.y * 20;
        const radius = Math.max(width, height) * cloud.r;

        const grad = ctx.createRadialGradient(cx, cy, radius * 0.05, cx, cy, radius);
        grad.addColorStop(0, cloud.color1);
        grad.addColorStop(1, cloud.color2);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Twinkling Rose-Gold & Crystal Sparkles
      sparkles.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

        const px = s.x + mouseRef.current.x * 25 * s.depth;
        const py = s.y + mouseRef.current.y * 25 * s.depth;

        let displayX = ((px % width) + width) % width;
        let displayY = ((py % height) + height) % height;

        ctx.beginPath();
        ctx.fillStyle = `${s.color}${currentAlpha})`;
        ctx.arc(displayX, displayY, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra diamond glow for brighter sparkles
        if (s.radius > 1.2 && currentAlpha > 0.5) {
          ctx.beginPath();
          ctx.fillStyle = `${s.color}${currentAlpha * 0.25})`;
          ctx.arc(displayX, displayY, s.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Handle Shooting Shimmer Stars
      if (Date.now() > nextShootingTime) {
        spawnShootingSparkle();
      }

      for (let i = shootingSparkles.length - 1; i >= 0; i--) {
        const meteor = shootingSparkles[i];
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= meteor.decay;

        if (meteor.alpha <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          shootingSparkles.splice(i, 1);
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const meteorGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        meteorGrad.addColorStop(0, `${meteor.color}${meteor.alpha})`);
        meteorGrad.addColorStop(0.3, `${meteor.color}${meteor.alpha * 0.6})`);
        meteorGrad.addColorStop(1, `${meteor.color}0)`);

        ctx.beginPath();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.8;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Shimmering head of sparkle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
        ctx.arc(meteor.x, meteor.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
