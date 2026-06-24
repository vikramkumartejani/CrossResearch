"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#88C4FF";
const DIM = "rgba(255,255,255,0.06)";
const CX = 60.5;
const CY = 60.5;
const OUTER_R = 60.5;
const INNER_R = 56.25;
const TICK_OUTER_R = 51.5;
const TICK_INNER_R = 42.5;
const TOTAL_TICKS = 70;

function buildSVGContent(pct: number): string {
  const ns = "http://www.w3.org/2000/svg";
  let content = "";

  // 1. Dim donut background
  content += `<path d="M121 60.5C121 93.9132 93.9135 121 60.5002 121C27.087 121 0.000244141 93.9132 0.000244141 60.5C0.000244141 27.0868 27.087 0 60.5002 0C93.9135 0 121 27.0868 121 60.5ZM8.25439 60.5C8.25439 89.3546 31.6457 112.746 60.5002 112.746C89.3548 112.746 112.746 89.3546 112.746 60.5C112.746 31.6454 89.3548 8.25415 60.5002 8.25415C31.6457 8.25415 8.25439 31.6454 8.25439 60.5Z" fill="white" fill-opacity="0.03"/>`;

  // 2. Progress arc
  if (pct > 0) {
    const startAngle = -90 * (Math.PI / 180);
    const endAngleDeg = -90 + (pct / 100) * 360;
    const endAngle = endAngleDeg * (Math.PI / 180);
    const large = pct > 50 ? 1 : 0;

    if (pct >= 99.9) {
      content += `<circle cx="${CX}" cy="${CY}" r="${(OUTER_R + INNER_R) / 2}" fill="none" stroke="${ACCENT}" stroke-width="${OUTER_R - INNER_R}"/>`;
    } else {
      const o1 = { x: CX + OUTER_R * Math.cos(startAngle), y: CY + OUTER_R * Math.sin(startAngle) };
      const o2 = { x: CX + OUTER_R * Math.cos(endAngle), y: CY + OUTER_R * Math.sin(endAngle) };
      const i2 = { x: CX + INNER_R * Math.cos(endAngle), y: CY + INNER_R * Math.sin(endAngle) };
      const i1 = { x: CX + INNER_R * Math.cos(startAngle), y: CY + INNER_R * Math.sin(startAngle) };
      const d = `M${o1.x} ${o1.y} A${OUTER_R} ${OUTER_R} 0 ${large} 1 ${o2.x} ${o2.y} L${i2.x} ${i2.y} A${INNER_R} ${INNER_R} 0 ${large} 0 ${i1.x} ${i1.y} Z`;
      content += `<path d="${d}" fill="${ACCENT}"/>`;
    }
  }

  // 3. Tick marks
  for (let i = 0; i < TOTAL_TICKS; i++) {
    const angleDeg = (i / TOTAL_TICKS) * 360;
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const x1 = CX + Math.cos(angleRad) * TICK_OUTER_R;
    const y1 = CY + Math.sin(angleRad) * TICK_OUTER_R;
    const x2 = CX + Math.cos(angleRad) * TICK_INNER_R;
    const y2 = CY + Math.sin(angleRad) * TICK_INNER_R;
    const isLit = (i / TOTAL_TICKS) * 100 < pct;
    content += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isLit ? ACCENT : DIM}" stroke-width="1.3"/>`;
  }

  return content;
}

interface CircularProgressProps {
  target: number;
  label: string;
  duration?: number;
  delay?: number;
  triggered: boolean;
}

export default function CircularProgress({
  target,
  label,
  duration = 1800,
  delay = 0,
  triggered,
}: CircularProgressProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (svgRef.current) svgRef.current.innerHTML = buildSVGContent(0);
  }, []);

  useEffect(() => {
    if (!triggered || animatedRef.current) return;
    animatedRef.current = true;

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
      function frame(now: number) {
        const t = Math.min((now - startTime) / duration, 1);
        const pct = easeOut(t) * target;
        if (svgRef.current) svgRef.current.innerHTML = buildSVGContent(pct);
        if (labelRef.current) labelRef.current.textContent = `${Math.round(pct)}%`;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, delay);

    return () => clearTimeout(timeout);
  }, [triggered, target, duration, delay]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[121px] h-[121px]">
        <svg
          ref={svgRef}
          width="121"
          height="121"
          viewBox="0 0 121 121"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-[20px] leading-none pointer-events-none">
          <span ref={labelRef}>0%</span>
        </div>
      </div>
      <span
        className="text-white/60 text-[15px] leading-[22px] text-center font-normal"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}