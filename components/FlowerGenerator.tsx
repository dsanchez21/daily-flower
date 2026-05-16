'use client';

interface FlowerProps {
  dayNumber: number;
  size?: number;
}

export default function FlowerGenerator({ dayNumber, size = 200 }: FlowerProps) {
  // Usar el número del día como seed para generar flores consistentes
  const seed = dayNumber;
  
  // Función seeded random
  const seededRandom = (index: number): number => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  // Generar parámetros de la flor basado en el día
  const petalCount = Math.floor(seededRandom(1) * 6) + 5; // 5-11 pétalos
  const innerPetalCount = Math.floor(seededRandom(2) * 2) + 2; // 2-3 capas
  const petalLength = size * (0.3 + seededRandom(3) * 0.2);
  const petalWidth = size * (0.1 + seededRandom(4) * 0.08);
  
  // Colores de la flor
  const mainHue = Math.floor(seededRandom(5) * 360);
  const mainColor = `hsl(${mainHue}, 85%, 55%)`;
  const lightColor = `hsl(${mainHue}, 90%, 75%)`;
  const centerColor = `hsl(${(mainHue + 60) % 360}, 70%, 50%)`;

  // Generar pétalos
  const petals = [];
  for (let layer = 0; layer < innerPetalCount; layer++) {
    const layerPetals = Math.floor(petalCount * (1 - layer * 0.3));
    const layerLength = petalLength * (1 - layer * 0.3);
    const layerWidth = petalWidth * (0.8 - layer * 0.2);
    const layerRotation = layer * 12;

    for (let i = 0; i < layerPetals; i++) {
      const angle = (360 / layerPetals) * i + layerRotation;
      const rad = (angle * Math.PI) / 180;
      const x = size / 2 + Math.cos(rad) * (size * 0.15);
      const y = size / 2 + Math.sin(rad) * (size * 0.15);
      const rotation = angle;

      // Hacer pétalos ligeramente ondulados
      const wave = Math.sin(i * 0.5) * 5;

      petals.push(
        <ellipse
          key={`petal-${layer}-${i}`}
          cx={x}
          cy={y}
          rx={layerWidth}
          ry={layerLength}
          fill={layer === 0 ? mainColor : lightColor}
          opacity={1 - layer * 0.2}
          transform={`rotate(${rotation + wave} ${x} ${y})`}
          style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))' }}
        />
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: '20px auto',
        display: 'block',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
      }}
    >
      {/* Tallo */}
      <path
        d={`M ${size / 2} ${size} Q ${size / 2 - 15} ${size * 0.6} ${size / 2 - 10} ${size * 0.2}`}
        stroke="#2d5016"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hojas */}
      <ellipse
        cx={size / 2 - 35}
        cy={size * 0.5}
        rx="12"
        ry="30"
        fill="#4a7c2c"
        transform={`rotate(-30 ${size / 2 - 35} ${size * 0.5})`}
        opacity="0.8"
      />
      <ellipse
        cx={size / 2 + 35}
        cy={size * 0.5}
        rx="12"
        ry="30"
        fill="#3d6b23"
        transform={`rotate(30 ${size / 2 + 35} ${size * 0.5})`}
        opacity="0.8"
      />

      {/* Pétalos generados */}
      {petals}

      {/* Centro de la flor */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.1}
        fill={centerColor}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
      />

      {/* Detalles del centro */}
      <circle
        cx={size / 2 - size * 0.03}
        cy={size / 2 - size * 0.03}
        r={size * 0.03}
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}
