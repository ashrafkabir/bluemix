import React, { useRef, useEffect, useCallback } from 'react';

const DEFAULT_COLORS = ['#8B5CF6', '#06B6D4', '#A855F7'];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 139, g: 92, b: 246 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function generateBolt(startX, startY, endY, canvasWidth) {
  const segments = [];
  const branchChance = 0.04;
  const segmentLength = 8;
  const maxOffset = 30;

  function buildPath(x, y, targetY, depth, spread) {
    if (y >= targetY || depth > 5) return;

    const steps = Math.floor((targetY - y) / segmentLength);
    let curX = x;
    let curY = y;

    for (let i = 0; i < steps; i++) {
      const offset = (Math.random() - 0.5) * spread;
      const nextX = curX + offset;
      const nextY = curY + segmentLength + Math.random() * 4;

      segments.push({
        x1: curX,
        y1: curY,
        x2: nextX,
        y2: nextY,
        depth,
      });

      if (depth < 3 && Math.random() < branchChance + depth * 0.01) {
        const branchDirection = Math.random() < 0.5 ? -1 : 1;
        const branchSpread = spread * 0.6;
        const branchEndY = nextY + (targetY - nextY) * (0.3 + Math.random() * 0.4);
        buildPath(
          nextX + branchDirection * (10 + Math.random() * 20),
          nextY,
          branchEndY,
          depth + 1,
          branchSpread
        );
      }

      curX = nextX;
      curY = nextY;

      if (curX < 0 || curX > canvasWidth) break;
    }
  }

  buildPath(startX, startY, endY, 0, maxOffset);
  return segments;
}

function LightningCanvas({ intensity = 0.5, color = null }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const boltsRef = useRef([]);
  const lastBoltTimeRef = useRef(0);
  const ambientPhaseRef = useRef(0);

  const clampedIntensity = Math.max(0, Math.min(1, intensity));

  const getColors = useCallback(() => {
    if (color) return [color];
    return DEFAULT_COLORS;
  }, [color]);

  const getNextBoltDelay = useCallback(() => {
    const minDelay = 100;
    const maxDelay = 500;
    const range = maxDelay - minDelay;
    const adjusted = minDelay + range * (1 - clampedIntensity);
    return adjusted + Math.random() * adjusted * 0.5;
  }, [clampedIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let running = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function spawnBolt(now) {
      const colors = getColors();
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * canvas.width;
      const startY = 0;
      const endY = canvas.height * (0.4 + Math.random() * 0.6);

      const segments = generateBolt(startX, startY, endY, canvas.width);

      boltsRef.current.push({
        segments,
        color: chosenColor,
        birthTime: now,
        lifetime: 150 + Math.random() * 100,
        opacity: 0.7 + clampedIntensity * 0.3,
      });
    }

    function drawBolt(bolt, now) {
      const age = now - bolt.birthTime;
      const progress = age / bolt.lifetime;
      if (progress > 1) return false;

      const fade = progress < 0.1
        ? progress / 0.1
        : 1 - ((progress - 0.1) / 0.9);

      const alpha = fade * bolt.opacity;
      if (alpha <= 0) return false;

      const rgb = hexToRgb(bolt.color);

      bolt.segments.forEach((seg) => {
        const depthFade = 1 / (1 + seg.depth * 0.6);
        const lineWidth = Math.max(0.5, (3 - seg.depth * 0.8) * clampedIntensity + 0.5);

        // Outer glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.25 * depthFade;
        ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.lineWidth = lineWidth + 8;
        ctx.lineCap = 'round';
        ctx.shadowColor = bolt.color;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
        ctx.restore();

        // Mid glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.5 * depthFade;
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
        ctx.lineWidth = lineWidth + 3;
        ctx.lineCap = 'round';
        ctx.shadowColor = bolt.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
        ctx.restore();

        // Core
        ctx.save();
        ctx.globalAlpha = alpha * depthFade;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * depthFade})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
        ctx.restore();
      });

      return true;
    }

    function drawAmbientGlow(now) {
      ambientPhaseRef.current += 0.008;
      const pulse = (Math.sin(ambientPhaseRef.current) + 1) / 2;
      const glowStrength = 0.02 + pulse * 0.03 * clampedIntensity;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        0,
        0,
        canvas.width / 2,
        0,
        canvas.height * 0.7
      );

      const colors = getColors();
      const rgb = hexToRgb(colors[0]);

      gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowStrength})`);
      gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowStrength * 0.3})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    function animate(now) {
      if (!running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawAmbientGlow(now);

      // Spawn new bolts
      if (now - lastBoltTimeRef.current > getNextBoltDelay()) {
        const boltCount = Math.random() < clampedIntensity * 0.3 ? 2 : 1;
        for (let i = 0; i < boltCount; i++) {
          spawnBolt(now);
        }
        lastBoltTimeRef.current = now;
      }

      // Draw and prune bolts
      boltsRef.current = boltsRef.current.filter((bolt) => drawBolt(bolt, now));

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [clampedIntensity, getColors, getNextBoltDelay]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default LightningCanvas;
