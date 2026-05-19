'use client';

interface FlowerProps {
  dayNumber: number;
  size?: number;
}

export default function FlowerGenerator({ dayNumber, size = 200 }: FlowerProps) {
  // Función pura para obtener el seed base y el rng de cualquier día
  const getSeededRandomForDay = (day: number) => {
    return (index: number): number => {
      const x = Math.sin(day + index * 13.37) * 10000;
      return x - Math.floor(x);
    };
  };

  const archetypeCount = 4;
  
  const getArchetypeForDay = (day: number): number => {
    const sr = getSeededRandomForDay(day);
    return Math.floor(sr(0) * archetypeCount);
  };

  // SISTEMA ANTI-REPETICIÓN
  let archetype = getArchetypeForDay(dayNumber);
  const yesterdayArchetype = getArchetypeForDay(dayNumber - 1);
  if (archetype === yesterdayArchetype) {
    archetype = (archetype + 1) % archetypeCount;
  }

  // Generador aleatorio para EL DÍA ACTUAL
  const seededRandom = getSeededRandomForDay(dayNumber);
  
  // Paleta de colores principal
  const mainHue = Math.floor(seededRandom(5) * 360);
  const mainColor = `hsl(${mainHue}, 85%, 55%)`;
  const lightColor = `hsl(${mainHue}, 90%, 75%)`;
  const darkColor = `hsl(${mainHue}, 80%, 40%)`;
  const centerColor = `hsl(${(mainHue + 60) % 360}, 70%, 50%)`;

  const renderDaisy = () => {
    const petals = [];
    const petalCount = Math.floor(seededRandom(1) * 8) + 12; // 12-19
    const petalLength = size * (0.35 + seededRandom(2) * 0.1);
    
    // VARIABILIDAD: Grosor de pétalos (desde muy finos a muy gordos)
    const petalWidth = size * (0.02 + seededRandom(3) * 0.08);

    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i;
      const rad = (angle * Math.PI) / 180;
      const x = size / 2 + Math.cos(rad) * (size * 0.1);
      const y = size / 2 + Math.sin(rad) * (size * 0.1);

      petals.push(
        <ellipse
          key={`daisy-${i}`}
          cx={x}
          cy={y}
          rx={petalWidth}
          ry={petalLength}
          fill={i % 2 === 0 ? mainColor : lightColor}
          transform={`rotate(${angle + 90} ${x} ${y})`}
          style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))' }}
        />
      );
    }
    
    // VARIABILIDAD: Tamaño del centro (pequeño o gigante)
    const centerSize = size * (0.08 + seededRandom(5) * 0.15);
    const center = (
      <g key="center">
        <circle cx={size / 2} cy={size / 2} r={centerSize} fill={centerColor} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
        <circle cx={size / 2 - centerSize*0.2} cy={size / 2 - centerSize*0.2} r={centerSize*0.3} fill="rgba(255,255,255,0.3)" />
      </g>
    );
    
    return [...petals, center];
  };

  const renderLotus = () => {
    const petals = [];
    // VARIABILIDAD: Número de capas
    const layers = Math.floor(seededRandom(6) * 3) + 2; // 2-4 capas
    const basePetals = Math.floor(seededRandom(1) * 4) + 5; // 5-8 pétalos base
    
    // VARIABILIDAD: Forma de la curva de Bézier (puntiagudo o redondo)
    const curveTightness = 0.5 + seededRandom(7) * 0.8; // 0.5 a 1.3
    
    for (let layer = 0; layer < layers; layer++) {
      const layerPetals = basePetals + layer * 2;
      const layerLength = size * (0.4 - layer * 0.08);
      const layerWidth = size * (0.15 - layer * 0.03);
      const rotationOffset = layer * (15 + seededRandom(8) * 10);
      
      const layerColor = layer === 0 ? darkColor : layer === layers - 1 ? lightColor : mainColor;

      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + rotationOffset;
        
        // Curva Bezier paramétrica
        const pathData = `M ${size/2 - layerWidth/2} ${size/2} 
                          C ${size/2 - layerWidth*curveTightness} ${size/2 - layerLength*0.5} 
                            ${size/2 - layerWidth*0.2} ${size/2 - layerLength} 
                            ${size/2} ${size/2 - layerLength} 
                          C ${size/2 + layerWidth*0.2} ${size/2 - layerLength} 
                            ${size/2 + layerWidth*curveTightness} ${size/2 - layerLength*0.5} 
                            ${size/2 + layerWidth/2} ${size/2} Z`;

        petals.push(
          <path
            key={`lotus-${layer}-${i}`}
            d={pathData}
            fill={layerColor}
            transform={`rotate(${angle} ${size/2} ${size/2})`}
            style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
          />
        );
      }
    }
    
    const center = <circle key="center" cx={size / 2} cy={size / 2} r={size * 0.04} fill={centerColor} />;
    return [...petals, center];
  };

  const renderRose = () => {
    const petals = [];
    const layers = Math.floor(seededRandom(1) * 3) + 4; // 4-6 capas concéntricas
    
    // VARIABILIDAD: Desorden orgánico (cuánto se desplazan del centro perfecto)
    const chaos = seededRandom(9) * 0.8; 

    for (let layer = 0; layer < layers; layer++) {
      const layerPetals = 4 + layer * 2;
      const layerSize = size * (0.35 - layer * 0.05);
      const offset = size * 0.06;
      
      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + (layer * 25);
        const rad = (angle * Math.PI) / 180;
        
        // Aplicamos el caos a las posiciones X e Y
        const chaosX = (seededRandom(i + layer*10) - 0.5) * size * 0.1 * chaos;
        const chaosY = (seededRandom(i*2 + layer*10) - 0.5) * size * 0.1 * chaos;
        
        const x = size / 2 + Math.cos(rad) * offset * (layer * 0.6) + chaosX;
        const y = size / 2 + Math.sin(rad) * offset * (layer * 0.6) + chaosY;

        petals.push(
          <circle
            key={`rose-${layer}-${i}`}
            cx={x}
            cy={y}
            r={layerSize}
            fill={i % 2 === 0 ? mainColor : lightColor}
            opacity={0.9}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          />
        );
      }
    }
    return petals;
  };

  const renderSunflower = () => {
    const petals = [];
    const petalCount = Math.floor(seededRandom(1) * 15) + 15; // 15-30 pétalos
    
    // VARIABILIDAD: Ratio centro/pétalos. Puede ser un centro inmenso con pétalos enanos o viceversa.
    const centerRatio = 0.1 + seededRandom(10) * 0.2; // 0.1 a 0.3
    const centerRadius = size * centerRatio;
    
    const petalLength = size * (0.45 - centerRatio);
    const petalWidth = size * (0.02 + seededRandom(11) * 0.04);
    
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < petalCount; i++) {
        const angle = (360 / petalCount) * i + (layer * 5);
        const pathData = `M ${size/2 - petalWidth/2} ${size/2} 
                          Q ${size/2 - petalWidth} ${size/2 - petalLength/2} ${size/2} ${size/2 - petalLength} 
                          Q ${size/2 + petalWidth} ${size/2 - petalLength/2} ${size/2 + petalWidth/2} ${size/2} Z`;

        petals.push(
          <path
            key={`sunflower-${layer}-${i}`}
            d={pathData}
            fill={layer === 0 ? darkColor : mainColor}
            transform={`rotate(${angle} ${size/2} ${size/2}) translate(0, -${centerRadius * 0.8})`}
          />
        );
      }
    }
    
    // VARIABILIDAD: Color del centro (marrón oscuro, verdoso, amarillento oscuro)
    const centerBgHue = (mainHue + 30 + Math.floor(seededRandom(12)*100)) % 360;
    const centerBgColor = `hsl(${centerBgHue}, 60%, 15%)`;

    const center = [];
    center.push(<circle key="center-bg" cx={size/2} cy={size/2} r={centerRadius} fill={centerBgColor} />);
    
    const seedsCount = Math.floor(centerRadius * 1.5); // Más grande el centro, más semillas
    const goldenAngle = 137.5 * (Math.PI / 180);
    for (let i = 1; i <= seedsCount; i++) {
      const r = Math.sqrt(i) * (centerRadius / Math.sqrt(seedsCount)) * 0.9;
      const theta = i * goldenAngle;
      const x = size/2 + r * Math.cos(theta);
      const y = size/2 + r * Math.sin(theta);
      
      center.push(
        <circle
          key={`seed-${i}`}
          cx={x}
          cy={y}
          r={size * 0.006}
          fill={centerColor}
          opacity={0.8}
        />
      );
    }
    
    return [...petals, ...center];
  };

  const renderFlower = () => {
    switch(archetype) {
      case 0: return renderDaisy();
      case 1: return renderLotus();
      case 2: return renderRose();
      case 3: return renderSunflower();
      default: return renderDaisy();
    }
  };

  return (
    <svg
      className="animate-sway"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: '20px auto',
        display: 'block',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {/* Tallo orgánico */}
      <path
        d={`M ${size / 2} ${size} Q ${size / 2 - 15} ${size * 0.6} ${size / 2 - 10} ${size * 0.2}`}
        stroke="#2d5016"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hojas orgánicas */}
      <path
        d={`M ${size/2} ${size*0.6} Q ${size/2 - 40} ${size*0.5} ${size/2 - 50} ${size*0.4} Q ${size/2 - 20} ${size*0.4} ${size/2} ${size*0.6}`}
        fill="#4a7c2c"
        opacity="0.9"
      />
      <path
        d={`M ${size/2} ${size*0.7} Q ${size/2 + 40} ${size*0.6} ${size/2 + 45} ${size*0.5} Q ${size/2 + 15} ${size*0.5} ${size/2} ${size*0.7}`}
        fill="#3d6b23"
        opacity="0.9"
      />

      {/* Pétalos y centro generados por el arquetipo */}
      <g className="animate-breathe" style={{ transformOrigin: `${size/2}px ${size/2}px` }}>
        {renderFlower()}
      </g>

    </svg>
  );
}
