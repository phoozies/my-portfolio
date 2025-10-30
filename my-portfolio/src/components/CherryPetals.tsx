import { useEffect, useRef } from 'react';
import './CherryPetals.css';

interface CherryPetal {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speedY: number;
  speedRotation: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

const CherryPetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const petalsRef = useRef<CherryPetal[]>([]);
  const time = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const scrollY = window.scrollY || window.pageYOffset;
      mousePos.current = {
        x: e.clientX,
        y: e.clientY + scrollY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Re-calculate canvas height when content changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(document.body);

    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      
      const scale = Math.cos(rotX) * Math.cos(rotY);
      const perspective = 1 + (Math.sin(rotX) * 0.3);
      
      ctx.scale(scale * perspective, perspective);
      ctx.rotate(rotZ);
      
      ctx.globalAlpha = opacity * (0.7 + scale * 0.3);
      
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.6, -size * 0.7, size * 0.8, -size * 0.3, size * 0.5, 0);
      ctx.bezierCurveTo(size * 0.8, size * 0.3, size * 0.6, size * 0.7, 0, size);
      ctx.bezierCurveTo(-size * 0.6, size * 0.7, -size * 0.8, size * 0.3, -size * 0.5, 0);
      ctx.bezierCurveTo(-size * 0.8, -size * 0.3, -size * 0.6, -size * 0.7, 0, -size);
      ctx.closePath();
      
      const gradient = ctx.createRadialGradient(0, -size * 0.3, 0, 0, 0, size);
      gradient.addColorStop(0, '#FFD7E0');
      gradient.addColorStop(0.5, '#FFB7C5');
      gradient.addColorStop(1, '#FF8FA3');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255, 139, 163, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    const initPetals = () => {
      petalsRef.current = [];
      const petalCount = 100;
      const viewportHeight = window.innerHeight;
      
      for (let i = 0; i < petalCount; i++) {
        petalsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * viewportHeight * 2 - viewportHeight,
          z: Math.random(),
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          speedY: 0.8 + Math.random() * 1.2,
          speedRotation: 0.02 + Math.random() * 0.03,
          swayAmplitude: 30 + Math.random() * 50,
          swaySpeed: 0.01 + Math.random() * 0.02,
          swayOffset: Math.random() * Math.PI * 2,
          size: 8 + Math.random() * 8,
          opacity: 0.6 + Math.random() * 0.4,
          vx: 0,
          vy: 0
        });
      }
    };

    initPetals();

    const animate = () => {
      time.current += 0.016;
      
      // Clear the entire viewport area
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sortedPetals = [...petalsRef.current].sort((a, b) => a.z - b.z);

      sortedPetals.forEach((petal) => {
        // Mouse interaction - push petals away
        const dx = petal.x - mousePos.current.x;
        const dy = petal.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 120;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          petal.vx += Math.cos(angle) * force * 2;
          petal.vy += Math.sin(angle) * force * 2;
        }

        // Apply velocity with damping
        petal.x += petal.vx;
        petal.y += petal.vy;
        petal.vx *= 0.92;
        petal.vy *= 0.92;

        // Check if petal is in viewport
        const inViewport = petal.y >= scrollY - 200 && petal.y <= scrollY + viewportHeight + 200;
        
        // Fall faster when outside viewport (5x speed), normal speed when in viewport
        const speedMultiplier = inViewport ? 1 : 5;
        
        const sway = Math.sin(time.current * petal.swaySpeed + petal.swayOffset) * petal.swayAmplitude;
        petal.x += sway * 0.02;
        petal.y += petal.speedY * (1 + petal.z * 0.5) * speedMultiplier;

        petal.rotationX += petal.speedRotation;
        petal.rotationY += petal.speedRotation * 1.2;
        petal.rotationZ += petal.speedRotation * 0.5;

        // Reset petal when it goes below the entire document
        if (petal.y > canvas.height + 50) {
          petal.y = -50;
          petal.x = Math.random() * canvas.width;
          petal.z = Math.random();
          petal.rotationX = Math.random() * Math.PI * 2;
          petal.rotationY = Math.random() * Math.PI * 2;
          petal.rotationZ = Math.random() * Math.PI * 2;
          petal.vx = 0;
          petal.vy = 0;
        }

        if (petal.x < -50) petal.x = canvas.width + 50;
        if (petal.x > canvas.width + 50) petal.x = -50;

        // Only draw petals that are in or near the viewport
        if (petal.y >= scrollY - 200 && petal.y <= scrollY + viewportHeight + 200) {
          drawPetal(
            ctx,
            petal.x,
            petal.y,
            petal.size * (0.5 + petal.z * 0.5),
            petal.rotationX,
            petal.rotationY,
            petal.rotationZ,
            petal.opacity
          );
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="cherry-petals-canvas"
    />
  );
};

export default CherryPetals;
