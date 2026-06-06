'use client';

interface FlowerProps {
  dayNumber: number;
  size?: number;
}

// ─────────────────────────────────────────────
// Curated watercolor-inspired botanical palettes
// ─────────────────────────────────────────────

type HSL = [number, number, number];

interface WatercolorPalette {
  primary: HSL;
  secondary: HSL;
  wash: HSL;
  pigment: HSL;
  center: HSL;
}

const PALETTES: WatercolorPalette[] = [
  // Soft Rose
  { primary: [350, 52, 72], secondary: [345, 40, 82], wash: [355, 30, 91], pigment: [340, 60, 58], center: [42, 62, 58] },
  // Lavender Dream
  { primary: [268, 40, 72], secondary: [275, 30, 82], wash: [262, 22, 91], pigment: [272, 50, 56], center: [48, 55, 58] },
  // Peach Blossom
  { primary: [18, 58, 74], secondary: [14, 46, 84], wash: [22, 36, 91], pigment: [12, 65, 60], center: [42, 60, 52] },
  // Cornflower Blue
  { primary: [218, 46, 72], secondary: [212, 36, 82], wash: [222, 26, 91], pigment: [222, 56, 56], center: [48, 52, 58] },
  // Golden Amber
  { primary: [38, 60, 66], secondary: [42, 50, 78], wash: [34, 40, 88], pigment: [32, 70, 48], center: [22, 62, 32] },
  // Sage Green
  { primary: [138, 26, 62], secondary: [132, 20, 75], wash: [142, 16, 88], pigment: [142, 36, 48], center: [52, 50, 58] },
  // Cherry Pink
  { primary: [328, 46, 78], secondary: [332, 36, 88], wash: [322, 26, 93], pigment: [332, 56, 62], center: [48, 60, 52] },
  // Coral Sunset
  { primary: [4, 56, 70], secondary: [8, 46, 80], wash: [358, 36, 91], pigment: [352, 60, 56], center: [42, 60, 52] },
];

const hsl = (c: HSL, a?: number): string =>
  a !== undefined
    ? `hsla(${c[0]}, ${c[1]}%, ${c[2]}%, ${a})`
    : `hsl(${c[0]}, ${c[1]}%, ${c[2]}%)`;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function FlowerGenerator({ dayNumber, size = 200 }: FlowerProps) {
  // Deterministic seeded random
  const getSeededRandom = (day: number) => (index: number): number => {
    const x = Math.sin(day + index * 13.37) * 10000;
    return x - Math.floor(x);
  };

  const sr = getSeededRandom(dayNumber);

  // Palette selection
  const paletteIndex = Math.floor(sr(50) * PALETTES.length);
  const p = PALETTES[paletteIndex];

  // Archetype selection (6 types)
  const archetypeCount = 6;
  const getArchetype = (day: number): number => {
    const r = getSeededRandom(day);
    return Math.floor(r(0) * archetypeCount);
  };

  let archetype = getArchetype(dayNumber);
  const yesterdayArchetype = getArchetype(dayNumber - 1);
  if (archetype === yesterdayArchetype) {
    archetype = (archetype + 1) % archetypeCount;
  }

  const fcx = size / 2; // flower center x
  const fcy = size / 2; // flower center y

  // ─────────────────────────────────────────────
  // Organic petal path generators
  // All draw upward from (fcx, fcy) and are rotated into position
  // ─────────────────────────────────────────────

  /** Elongated teardrop – for Daisy */
  const teardropPetal = (w: number, len: number) =>
    `M ${fcx} ${fcy} C ${fcx - w * 0.7} ${fcy - len * 0.25} ${fcx - w * 0.5} ${fcy - len * 0.75} ${fcx} ${fcy - len} C ${fcx + w * 0.5} ${fcy - len * 0.75} ${fcx + w * 0.7} ${fcy - len * 0.25} ${fcx} ${fcy} Z`;

  /** Wide cupped with pointed tip – for Lotus & Rose */
  const cuppedPetal = (w: number, len: number) =>
    `M ${fcx} ${fcy} C ${fcx - w} ${fcy - len * 0.2} ${fcx - w * 1.3} ${fcy - len * 0.65} ${fcx - w * 0.25} ${fcy - len * 0.95} Q ${fcx} ${fcy - len * 1.05} ${fcx + w * 0.25} ${fcy - len * 0.95} C ${fcx + w * 1.3} ${fcy - len * 0.65} ${fcx + w} ${fcy - len * 0.2} ${fcx} ${fcy} Z`;

  /** Narrow lance – for Sunflower */
  const pointedPetal = (w: number, len: number) =>
    `M ${fcx} ${fcy} C ${fcx - w * 0.5} ${fcy - len * 0.2} ${fcx - w * 0.3} ${fcy - len * 0.7} ${fcx} ${fcy - len} C ${fcx + w * 0.3} ${fcy - len * 0.7} ${fcx + w * 0.5} ${fcy - len * 0.2} ${fcx} ${fcy} Z`;

  /** Round balloon – for Tulip */
  const ovalPetal = (w: number, len: number) =>
    `M ${fcx} ${fcy} C ${fcx - w * 1.2} ${fcy - len * 0.1} ${fcx - w * 1.5} ${fcy - len * 0.55} ${fcx - w * 0.2} ${fcy - len * 0.97} Q ${fcx} ${fcy - len * 1.05} ${fcx + w * 0.2} ${fcy - len * 0.97} C ${fcx + w * 1.5} ${fcy - len * 0.55} ${fcx + w * 1.2} ${fcy - len * 0.1} ${fcx} ${fcy} Z`;

  /** Heart-notched tip – for Sakura */
  const notchedPetal = (w: number, len: number) =>
    `M ${fcx} ${fcy} C ${fcx - w * 0.6} ${fcy - len * 0.25} ${fcx - w * 0.45} ${fcy - len * 0.7} ${fcx - w * 0.12} ${fcy - len * 0.95} Q ${fcx} ${fcy - len * 0.82} ${fcx + w * 0.12} ${fcy - len * 0.95} C ${fcx + w * 0.45} ${fcy - len * 0.7} ${fcx + w * 0.6} ${fcy - len * 0.25} ${fcx} ${fcy} Z`;

  // ─────────────────────────────────────────────
  // SVG definitions: filters & gradients
  // ─────────────────────────────────────────────

  const defs = (
    <defs>
      {/* Watercolor displacement filter – organic bleeding edges */}
      <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed={dayNumber} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.5" />
      </filter>

      {/* Lighter watercolor for stems & leaves */}
      <filter id="watercolor-light" x="-15%" y="-15%" width="130%" height="130%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed={dayNumber + 50} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.3" />
      </filter>

      {/* Stem gradient – soft muted green */}
      <linearGradient id="stem-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6b9d4a" />
        <stop offset="50%" stopColor="#4a7832" />
        <stop offset="100%" stopColor="#2d5018" />
      </linearGradient>

      {/* Leaf gradient */}
      <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7db85a" />
        <stop offset="100%" stopColor="#3a6820" />
      </linearGradient>

      {/* Radial center gradient */}
      <radialGradient id="center-grad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor={hsl([p.center[0], p.center[1] + 15, p.center[2] + 20])} />
        <stop offset="70%" stopColor={hsl(p.center)} />
        <stop offset="100%" stopColor={hsl([p.center[0], p.center[1], p.center[2] - 10])} />
      </radialGradient>
    </defs>
  );

  // ═════════════════════════════════════════════
  //  FLOWER RENDERERS
  // ═════════════════════════════════════════════

  // ── Daisy ──────────────────────────────────

  const renderDaisy = () => {
    const elements: JSX.Element[] = [];
    const petalCount = Math.floor(sr(1) * 5) + 11;
    const baseLen = size * (0.30 + sr(2) * 0.06);
    const baseWid = size * (0.055 + sr(3) * 0.025);

    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i + sr(i + 20) * 8 - 4;
      const len = baseLen * (0.92 + sr(i + 30) * 0.16);
      const w = baseWid * (0.88 + sr(i + 40) * 0.24);
      const delay = 1.0 + i * 0.06;
      const path = teardropPetal(w, len);

      elements.push(
        <g key={`d-${i}`} className="animate-petal"
          style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
          <path d={path} fill={hsl(p.wash)} fillOpacity={0.4}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <path d={path} fill={hsl(i % 2 === 0 ? p.primary : p.secondary)} fillOpacity={0.6}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <line x1={fcx} y1={fcy + len * 0.05} x2={fcx} y2={fcy - len * 0.85}
            stroke={hsl(p.pigment)} strokeWidth={0.6} opacity={0.18}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
        </g>
      );
    }

    // Center cluster with florets
    const centerR = size * 0.065;
    const centerDelay = 1.0 + petalCount * 0.06 + 0.15;
    elements.push(
      <g key="center" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${centerDelay}s` }}>
        <circle cx={fcx} cy={fcy} r={centerR} fill="url(#center-grad)" fillOpacity={0.85} />
        {Array.from({ length: 20 }, (_, i) => {
          const r = centerR * 0.65 * Math.sqrt((i + 1) / 20);
          const theta = (i + 1) * 137.508 * Math.PI / 180;
          return (
            <circle key={`fl-${i}`}
              cx={fcx + r * Math.cos(theta)} cy={fcy + r * Math.sin(theta)}
              r={size * 0.004} fill={hsl(p.pigment)} fillOpacity={0.5} />
          );
        })}
        <circle cx={fcx - centerR * 0.2} cy={fcy - centerR * 0.2}
          r={centerR * 0.3} fill="white" fillOpacity={0.3} />
      </g>
    );

    return elements;
  };

  // ── Lotus ──────────────────────────────────

  const renderLotus = () => {
    const elements: JSX.Element[] = [];
    const layers = Math.floor(sr(6) * 2) + 3;
    const basePetals = Math.floor(sr(1) * 3) + 5;
    let globalIdx = 0;

    for (let layer = 0; layer < layers; layer++) {
      const layerPetals = basePetals + layer * 2;
      const layerLen = size * (0.38 - layer * 0.065);
      const layerWid = size * (0.10 - layer * 0.015);
      const rotOffset = layer * (18 + sr(8) * 10);
      const opacity = 0.35 + (layer / (layers - 1)) * 0.35;

      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + rotOffset;
        const path = cuppedPetal(layerWid, layerLen);
        const delay = 1.0 + globalIdx * 0.04;
        globalIdx++;

        const petalColor = layer < layers / 2 ? p.secondary : p.primary;

        elements.push(
          <g key={`l-${layer}-${i}`} className="animate-petal"
            style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
            <path d={path} fill={hsl(p.wash)} fillOpacity={opacity * 0.5}
              transform={`rotate(${angle} ${fcx} ${fcy})`} />
            <path d={path} fill={hsl(petalColor)} fillOpacity={opacity}
              transform={`rotate(${angle} ${fcx} ${fcy})`} />
          </g>
        );
      }
    }

    // Small center
    const centerDelay = 1.0 + globalIdx * 0.04 + 0.1;
    elements.push(
      <g key="center" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${centerDelay}s` }}>
        <circle cx={fcx} cy={fcy} r={size * 0.035} fill="url(#center-grad)" fillOpacity={0.9} />
        <circle cx={fcx} cy={fcy} r={size * 0.015}
          fill={hsl([p.center[0], p.center[1] + 10, p.center[2] + 15])} fillOpacity={0.6} />
      </g>
    );

    return elements;
  };

  // ── Rose ──────────────────────────────────

  const renderRose = () => {
    const elements: JSX.Element[] = [];
    const layers = Math.floor(sr(1) * 2) + 4;

    // Outer layers rendered first (behind), inner layers last (on top)
    for (let layer = layers - 1; layer >= 0; layer--) {
      const layerPetals = Math.min(3 + layer, 7);
      const layerLen = size * (0.06 + layer * 0.06);
      const layerWid = size * (0.05 + layer * 0.02);
      const rotBase = layer * 42 + sr(layer + 10) * 15;

      const opacity = 0.35 + ((layers - 1 - layer) / (layers - 1)) * 0.35;
      const satBoost = (layers - 1 - layer) * 5;
      const color: HSL = layer < 2
        ? [p.pigment[0], Math.min(p.pigment[1] + satBoost, 80), p.pigment[2] - satBoost / 2]
        : layer < layers - 1 ? p.primary : p.secondary;

      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + rotBase;
        const path = cuppedPetal(layerWid, layerLen);
        const delay = 1.0 + (layers - 1 - layer) * 0.15 + i * 0.04;

        elements.push(
          <g key={`r-${layer}-${i}`} className="animate-petal"
            style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
            <path d={path} fill={hsl(p.wash)} fillOpacity={opacity * 0.5}
              transform={`rotate(${angle} ${fcx} ${fcy})`} />
            <path d={path} fill={hsl(color)} fillOpacity={opacity}
              transform={`rotate(${angle} ${fcx} ${fcy})`} />
          </g>
        );
      }
    }

    // Tight center spiral
    const centerDelay = 1.0 + layers * 0.15 + 0.2;
    elements.push(
      <g key="rose-center" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${centerDelay}s` }}>
        <circle cx={fcx} cy={fcy} r={size * 0.02} fill={hsl(p.pigment)} fillOpacity={0.7} />
        <circle cx={fcx} cy={fcy} r={size * 0.008}
          fill={hsl([p.pigment[0], p.pigment[1] + 10, p.pigment[2] + 15])} fillOpacity={0.5} />
      </g>
    );

    return elements;
  };

  // ── Sunflower ──────────────────────────────

  const renderSunflower = () => {
    const elements: JSX.Element[] = [];
    const petalCount = Math.floor(sr(1) * 8) + 16;
    const centerRatio = 0.12 + sr(10) * 0.08;
    const centerRadius = size * centerRatio;
    const petalLen = size * (0.35 - centerRatio * 0.5);
    const petalWid = size * (0.025 + sr(11) * 0.015);
    let delayIdx = 0;

    // Sunflower uses iconic golden tones regardless of palette
    const sfPrimary: HSL = [42, 75, 58];
    const sfSecondary: HSL = [38, 70, 68];
    const sfWash: HSL = [45, 55, 80];

    for (let ring = 0; ring < 2; ring++) {
      for (let i = 0; i < petalCount; i++) {
        const angle = (360 / petalCount) * i + ring * (180 / petalCount);
        const len = petalLen * (0.9 + sr(i + ring * 50 + 20) * 0.2);
        const path = pointedPetal(petalWid, len);
        const delay = 1.0 + delayIdx * 0.025;
        delayIdx++;

        elements.push(
          <g key={`sf-${ring}-${i}`} className="animate-petal"
            style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
            <path d={path} fill={hsl(sfWash)} fillOpacity={0.35}
              transform={`rotate(${angle} ${fcx} ${fcy}) translate(0 ${-centerRadius * 0.6})`} />
            <path d={path} fill={hsl(ring === 0 ? sfPrimary : sfSecondary)}
              fillOpacity={ring === 0 ? 0.55 : 0.65}
              transform={`rotate(${angle} ${fcx} ${fcy}) translate(0 ${-centerRadius * 0.6})`} />
          </g>
        );
      }
    }

    // Center disk
    const diskDelay = 1.0 + delayIdx * 0.025 + 0.1;
    const diskColor: HSL = [25, 55, 18];

    elements.push(
      <g key="disk" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${diskDelay}s` }}>
        <circle cx={fcx} cy={fcy} r={centerRadius} fill={hsl(diskColor)} fillOpacity={0.85} />
      </g>
    );

    // Fibonacci spiral seeds
    const seedCount = Math.floor(centerRadius * 2.5);
    const goldenAngle = 137.508 * (Math.PI / 180);
    for (let i = 1; i <= seedCount; i++) {
      const r = Math.sqrt(i) * (centerRadius / Math.sqrt(seedCount)) * 0.88;
      const theta = i * goldenAngle;
      const sx = fcx + r * Math.cos(theta);
      const sy = fcy + r * Math.sin(theta);
      const seedDelay = diskDelay + i * 0.008;
      const seedColor: HSL = [40, 65, 45 + (i / seedCount) * 15];

      elements.push(
        <circle key={`seed-${i}`} cx={sx} cy={sy} r={size * 0.007}
          fill={hsl(seedColor)} fillOpacity={0.8}
          className="animate-petal"
          style={{ transformOrigin: `${sx}px ${sy}px`, animationDelay: `${seedDelay}s` }} />
      );
    }

    return elements;
  };

  // ── Tulip ──────────────────────────────────

  const renderTulip = () => {
    const elements: JSX.Element[] = [];
    const len = size * (0.30 + sr(1) * 0.05);
    const w = size * (0.10 + sr(2) * 0.02);

    // 3 outer petals
    for (let i = 0; i < 3; i++) {
      const angle = 120 * i + sr(i + 10) * 5;
      const path = ovalPetal(w * 1.15, len);
      const delay = 1.0 + i * 0.12;

      elements.push(
        <g key={`to-${i}`} className="animate-petal"
          style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
          <path d={path} fill={hsl(p.wash)} fillOpacity={0.35}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <path d={path} fill={hsl(p.secondary)} fillOpacity={0.55}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
        </g>
      );
    }

    // 3 inner petals
    for (let i = 0; i < 3; i++) {
      const angle = 60 + 120 * i + sr(i + 15) * 5;
      const path = ovalPetal(w * 0.95, len * 0.92);
      const delay = 1.0 + 3 * 0.12 + i * 0.12;

      elements.push(
        <g key={`ti-${i}`} className="animate-petal"
          style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
          <path d={path} fill={hsl(p.wash)} fillOpacity={0.3}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <path d={path} fill={hsl(p.primary)} fillOpacity={0.65}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
        </g>
      );
    }

    // Center with stamens
    const centerDelay = 1.0 + 6 * 0.12 + 0.1;
    elements.push(
      <g key="tulip-center" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${centerDelay}s` }}>
        <circle cx={fcx} cy={fcy} r={size * 0.025} fill="url(#center-grad)" fillOpacity={0.75} />
        {Array.from({ length: 6 }, (_, i) => {
          const sAngle = 60 * i + sr(i + 25) * 10;
          const sRad = (sAngle * Math.PI) / 180;
          const sLen = size * 0.04;
          const sx = fcx + Math.sin(sRad) * sLen;
          const sy = fcy - Math.cos(sRad) * sLen;
          return (
            <g key={`ts-${i}`}>
              <line x1={fcx} y1={fcy} x2={sx} y2={sy}
                stroke={hsl(p.pigment)} strokeWidth={0.8} opacity={0.3} />
              <circle cx={sx} cy={sy} r={size * 0.005}
                fill={hsl([p.center[0] + 20, 60, 50])} fillOpacity={0.65} />
            </g>
          );
        })}
      </g>
    );

    return elements;
  };

  // ── Sakura (Cherry Blossom) ────────────────

  const renderSakura = () => {
    const elements: JSX.Element[] = [];
    const petalCount = 5;
    const len = size * (0.26 + sr(1) * 0.04);
    const w = size * (0.12 + sr(2) * 0.03);

    // Sakura uses soft pink tones – use palette hue if warm, else default pink
    const sakuraHue = (p.primary[0] > 300 || p.primary[0] < 30) ? p.primary[0] : 335;
    const sakuraPrimary: HSL = [sakuraHue, 42, 80];
    const sakuraWash: HSL = [sakuraHue, 28, 92];
    const sakuraPigment: HSL = [sakuraHue, 52, 68];

    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i + sr(i + 10) * 6 - 3;
      const path = notchedPetal(w, len);
      const delay = 1.0 + i * 0.12;

      elements.push(
        <g key={`sk-${i}`} className="animate-petal"
          style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${delay}s` }}>
          <path d={path} fill={hsl(sakuraWash)} fillOpacity={0.45}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <path d={path} fill={hsl(sakuraPrimary)} fillOpacity={0.55}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
          <line x1={fcx} y1={fcy + len * 0.05} x2={fcx} y2={fcy - len * 0.78}
            stroke={hsl(sakuraPigment)} strokeWidth={0.5} opacity={0.15}
            transform={`rotate(${angle} ${fcx} ${fcy})`} />
        </g>
      );
    }

    // Stamens radiating from center
    const stamenCount = 8 + Math.floor(sr(20) * 6);
    const stamenDelay = 1.0 + petalCount * 0.12 + 0.1;
    const stamenElements: JSX.Element[] = [];

    for (let i = 0; i < stamenCount; i++) {
      const sAngle = (360 / stamenCount) * i + sr(i + 30) * 15 - 7;
      const stamenLen = size * (0.08 + sr(i + 40) * 0.06);
      const rad = (sAngle * Math.PI) / 180;
      const ex = fcx + Math.sin(rad) * stamenLen;
      const ey = fcy - Math.cos(rad) * stamenLen;

      stamenElements.push(
        <g key={`st-${i}`}>
          <line x1={fcx} y1={fcy} x2={ex} y2={ey}
            stroke={hsl(sakuraPigment)} strokeWidth={0.7} opacity={0.35} />
          <circle cx={ex} cy={ey} r={size * 0.006}
            fill={hsl([sakuraHue - 10, 60, 55])} fillOpacity={0.7} />
        </g>
      );
    }

    elements.push(
      <g key="stamens" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${stamenDelay}s` }}>
        {stamenElements}
      </g>
    );

    // Center dot
    elements.push(
      <g key="center" className="animate-petal"
        style={{ transformOrigin: `${fcx}px ${fcy}px`, animationDelay: `${stamenDelay + 0.1}s` }}>
        <circle cx={fcx} cy={fcy} r={size * 0.018} fill={hsl([55, 50, 55])} fillOpacity={0.7} />
      </g>
    );

    // Falling petals for atmosphere
    for (let i = 0; i < 3; i++) {
      const startX = fcx + (sr(60 + i) - 0.5) * size * 0.4;
      const startY = fcy - size * 0.1 + sr(65 + i) * size * 0.2;
      const fallX = (sr(70 + i) - 0.3) * size * 0.5;
      const fallY = size * (0.3 + sr(75 + i) * 0.3);
      const fallRot = 90 + sr(80 + i) * 120;
      const sLen = len * 0.3;
      const sW = w * 0.3;
      const fallDelay = 2.5 + i * 0.8;

      const smallPath = `M ${startX} ${startY} C ${startX - sW * 0.6} ${startY - sLen * 0.25} ${startX - sW * 0.45} ${startY - sLen * 0.7} ${startX - sW * 0.12} ${startY - sLen * 0.95} Q ${startX} ${startY - sLen * 0.82} ${startX + sW * 0.12} ${startY - sLen * 0.95} C ${startX + sW * 0.45} ${startY - sLen * 0.7} ${startX + sW * 0.6} ${startY - sLen * 0.25} ${startX} ${startY} Z`;

      elements.push(
        <path key={`fall-${i}`} d={smallPath}
          fill={hsl(sakuraPrimary)} fillOpacity={0.4}
          className="animate-falling-petal"
          style={{
            '--fall-x': `${fallX}px`,
            '--fall-y': `${fallY}px`,
            '--fall-rot': `${fallRot}deg`,
            animationDelay: `${fallDelay}s`,
            transformOrigin: `${startX}px ${startY}px`
          } as React.CSSProperties} />
      );
    }

    return elements;
  };

  // ═════════════════════════════════════════════
  //  Archetype switch
  // ═════════════════════════════════════════════

  const renderFlower = () => {
    switch (archetype) {
      case 0: return renderDaisy();
      case 1: return renderLotus();
      case 2: return renderRose();
      case 3: return renderSunflower();
      case 4: return renderTulip();
      case 5: return renderSakura();
      default: return renderDaisy();
    }
  };

  // ═════════════════════════════════════════════
  //  Main SVG
  // ═════════════════════════════════════════════

  return (
    <svg
      className="animate-sway"
      viewBox={`-${size * 0.1} -${size * 0.15} ${size * 1.2} ${size * 1.2}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: '20px auto',
        display: 'block',
        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))',
        transition: 'all 0.5s ease-in-out',
        overflow: 'visible'
      }}
    >
      {defs}

      {/* ── Stem ── */}
      <g filter="url(#watercolor-light)">
        <path
          className="animate-stem"
          d={`M ${fcx - 6} ${size} Q ${fcx - 20} ${size * 0.72} ${fcx - 3} ${size * 0.42} L ${fcx + 3} ${size * 0.42} Q ${fcx - 10} ${size * 0.72} ${fcx + 6} ${size} Z`}
          fill="url(#stem-grad)"
          fillOpacity={0.85}
        />
      </g>

      {/* ── Sepals ── */}
      <g style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.12))' }}>
        <path
          d={`M ${fcx - 3} ${size * 0.42} C ${fcx - 14} ${size * 0.4} ${fcx - 24} ${size * 0.36} ${fcx - 32} ${size * 0.31} Q ${fcx - 14} ${size * 0.36} ${fcx} ${size * 0.38} Q ${fcx + 14} ${size * 0.36} ${fcx + 32} ${size * 0.31} C ${fcx + 24} ${size * 0.36} ${fcx + 14} ${size * 0.4} ${fcx + 3} ${size * 0.42} Z`}
          fill="url(#stem-grad)"
          fillOpacity={0.8}
        />
      </g>

      {/* ── Left leaf with vein ── */}
      <g className="animate-leaf" style={{ animationDelay: '0.5s' }} filter="url(#watercolor-light)">
        <path
          d={`M ${fcx - 12} ${size * 0.8} Q ${fcx - 48} ${size * 0.75} ${fcx - 65} ${size * 0.56} Q ${fcx - 28} ${size * 0.52} ${fcx - 6} ${size * 0.72}`}
          fill="url(#leaf-grad)"
          fillOpacity={0.8}
        />
        <path
          d={`M ${fcx - 10} ${size * 0.77} Q ${fcx - 35} ${size * 0.68} ${fcx - 55} ${size * 0.58}`}
          stroke="#2d5018" strokeWidth={0.8} fill="none" opacity={0.25}
        />
      </g>

      {/* ── Right leaf with vein ── */}
      <g className="animate-leaf" style={{ animationDelay: '0.7s' }} filter="url(#watercolor-light)">
        <path
          d={`M ${fcx + 2} ${size * 0.88} Q ${fcx + 38} ${size * 0.88} ${fcx + 55} ${size * 0.71} Q ${fcx + 28} ${size * 0.62} ${fcx} ${size * 0.8}`}
          fill="url(#leaf-grad)"
          fillOpacity={0.8}
        />
        <path
          d={`M ${fcx + 2} ${size * 0.85} Q ${fcx + 30} ${size * 0.8} ${fcx + 48} ${size * 0.73}`}
          stroke="#2d5018" strokeWidth={0.8} fill="none" opacity={0.25}
        />
      </g>

      {/* ── Flower head with watercolor filter ── */}
      <g transform={`translate(0, -${size * 0.15})`}>
        <g className="animate-breathe" style={{ transformOrigin: `${fcx}px ${fcy}px` }}
          filter="url(#watercolor)">
          {renderFlower()}
        </g>
      </g>
    </svg>
  );
}
