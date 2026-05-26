'use client';

interface FlowerProps {
  dayNumber: number;
  size?: number;
}

export default function FlowerGenerator({ dayNumber, size = 200 }: FlowerProps) {
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

  let archetype = getArchetypeForDay(dayNumber);
  const yesterdayArchetype = getArchetypeForDay(dayNumber - 1);
  if (archetype === yesterdayArchetype) {
    archetype = (archetype + 1) % archetypeCount;
  }

  const seededRandom = getSeededRandomForDay(dayNumber);
  
  const mainHue = Math.floor(seededRandom(5) * 360);
  const mainColor = `hsl(${mainHue}, 85%, 55%)`;
  const lightColor = `hsl(${mainHue}, 90%, 75%)`;
  const darkColor = `hsl(${mainHue}, 80%, 40%)`;
  const centerColor = `hsl(${(mainHue + 60) % 360}, 70%, 50%)`;

  const defs = (
    <defs>
      <radialGradient id="petal-grad-main" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={lightColor} />
        <stop offset="60%" stopColor={mainColor} />
        <stop offset="100%" stopColor={darkColor} />
      </radialGradient>
      <radialGradient id="petal-grad-light" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor={lightColor} />
        <stop offset="100%" stopColor={mainColor} />
      </radialGradient>
      <radialGradient id="petal-grad-dark" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={mainColor} />
        <stop offset="100%" stopColor={darkColor} />
      </radialGradient>
      <radialGradient id="center-grad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={`hsl(${(mainHue + 60) % 360}, 90%, 70%)`} />
        <stop offset="100%" stopColor={centerColor} />
      </radialGradient>
      <linearGradient id="stem-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a7c2a" />
        <stop offset="50%" stopColor="#2d5016" />
        <stop offset="100%" stopColor="#1a330a" />
      </linearGradient>
      <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5aa033" />
        <stop offset="100%" stopColor="#2d5016" />
      </linearGradient>
    </defs>
  );

  const renderDaisy = () => {
    const petals = [];
    const petalCount = Math.floor(seededRandom(1) * 8) + 12; // 12-19
    const petalLength = size * (0.35 + seededRandom(2) * 0.1);
    const petalWidth = size * (0.02 + seededRandom(3) * 0.08);

    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i;
      const rad = (angle * Math.PI) / 180;
      const x = size / 2 + Math.cos(rad) * (size * 0.1);
      const y = size / 2 + Math.sin(rad) * (size * 0.1);
      
      const delay = 1.0 + (i * 0.04); // Sequential bloom delay

      petals.push(
        <g 
          key={`daisy-${i}`} 
          className="animate-petal" 
          style={{ 
            transformOrigin: `${x}px ${y}px`, 
            animationDelay: `${delay}s` 
          }}
        >
          <ellipse
            cx={x}
            cy={y}
            rx={petalWidth}
            ry={petalLength}
            fill={i % 2 === 0 ? "url(#petal-grad-main)" : "url(#petal-grad-light)"}
            transform={`rotate(${angle + 90} ${x} ${y})`}
            style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))' }}
          />
        </g>
      );
    }
    
    const centerSize = size * (0.08 + seededRandom(5) * 0.15);
    const centerDelay = 1.0 + (petalCount * 0.04) + 0.2;

    const center = (
      <g 
        key="center" 
        className="animate-petal" 
        style={{ transformOrigin: `${size/2}px ${size/2}px`, animationDelay: `${centerDelay}s` }}
      >
        <circle cx={size / 2} cy={size / 2} r={centerSize} fill="url(#center-grad)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
        <circle cx={size / 2 - centerSize*0.2} cy={size / 2 - centerSize*0.2} r={centerSize*0.3} fill="rgba(255,255,255,0.4)" />
      </g>
    );
    
    return [...petals, center];
  };

  const renderLotus = () => {
    const petals = [];
    const layers = Math.floor(seededRandom(6) * 3) + 2; // 2-4 capas
    const basePetals = Math.floor(seededRandom(1) * 4) + 5; // 5-8 pétalos base
    const curveTightness = 0.5 + seededRandom(7) * 0.8;
    
    let globalIndex = 0;

    for (let layer = 0; layer < layers; layer++) {
      const layerPetals = basePetals + layer * 2;
      const layerLength = size * (0.4 - layer * 0.08);
      const layerWidth = size * (0.15 - layer * 0.03);
      const rotationOffset = layer * (15 + seededRandom(8) * 10);
      
      const layerFill = layer === 0 ? "url(#petal-grad-dark)" : layer === layers - 1 ? "url(#petal-grad-light)" : "url(#petal-grad-main)";

      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + rotationOffset;
        
        const pathData = `M ${size/2 - layerWidth/2} ${size/2} 
                          C ${size/2 - layerWidth*curveTightness} ${size/2 - layerLength*0.5} 
                            ${size/2 - layerWidth*0.2} ${size/2 - layerLength} 
                            ${size/2} ${size/2 - layerLength} 
                          C ${size/2 + layerWidth*0.2} ${size/2 - layerLength} 
                            ${size/2 + layerWidth*curveTightness} ${size/2 - layerLength*0.5} 
                            ${size/2 + layerWidth/2} ${size/2} Z`;

        const delay = 1.0 + (globalIndex * 0.05); // Outer to inner or vice versa
        globalIndex++;

        petals.push(
          <g 
            key={`lotus-${layer}-${i}`} 
            className="animate-petal" 
            style={{ 
              transformOrigin: `${size/2}px ${size/2}px`, 
              animationDelay: `${delay}s` 
            }}
          >
            <path
              d={pathData}
              fill={layerFill}
              transform={`rotate(${angle} ${size/2} ${size/2})`}
              style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))' }}
            />
          </g>
        );
      }
    }
    
    const centerDelay = 1.0 + (globalIndex * 0.05) + 0.1;
    const center = (
      <circle 
        key="center" 
        cx={size / 2} cy={size / 2} r={size * 0.04} 
        fill="url(#center-grad)"
        className="animate-petal"
        style={{ transformOrigin: `${size/2}px ${size/2}px`, animationDelay: `${centerDelay}s` }}
      />
    );
    return [...petals, center];
  };

  const renderRose = () => {
    const petals = [];
    const layers = Math.floor(seededRandom(1) * 3) + 4; // 4-6 capas concéntricas
    const chaos = seededRandom(9) * 0.8; 

    let globalIndex = 0;

    for (let layer = 0; layer < layers; layer++) {
      const layerPetals = 4 + layer * 2;
      const layerSize = size * (0.35 - layer * 0.05);
      const offset = size * 0.06;
      
      for (let i = 0; i < layerPetals; i++) {
        const angle = (360 / layerPetals) * i + (layer * 25);
        const rad = (angle * Math.PI) / 180;
        
        const chaosX = (seededRandom(i + layer*10) - 0.5) * size * 0.1 * chaos;
        const chaosY = (seededRandom(i*2 + layer*10) - 0.5) * size * 0.1 * chaos;
        
        const x = size / 2 + Math.cos(rad) * offset * (layer * 0.6) + chaosX;
        const y = size / 2 + Math.sin(rad) * offset * (layer * 0.6) + chaosY;

        const delay = 1.0 + ((layers - layer) * 0.15) + (i * 0.02);
        globalIndex++;

        petals.push(
          <g 
            key={`rose-${layer}-${i}`}
            className="animate-petal"
            style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${delay}s` }}
          >
            <circle
              cx={x}
              cy={y}
              r={layerSize}
              fill={i % 2 === 0 ? "url(#petal-grad-main)" : "url(#petal-grad-light)"}
              opacity={0.9}
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}
            />
          </g>
        );
      }
    }
    return petals;
  };

  const renderSunflower = () => {
    const petals = [];
    const petalCount = Math.floor(seededRandom(1) * 15) + 15; // 15-30 pétalos
    
    const centerRatio = 0.1 + seededRandom(10) * 0.2; 
    const centerRadius = size * centerRatio;
    
    const petalLength = size * (0.45 - centerRatio);
    const petalWidth = size * (0.02 + seededRandom(11) * 0.04);
    
    let delayCounter = 0;

    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < petalCount; i++) {
        const angle = (360 / petalCount) * i + (layer * 5);
        const pathData = `M ${size/2 - petalWidth/2} ${size/2} 
                          Q ${size/2 - petalWidth} ${size/2 - petalLength/2} ${size/2} ${size/2 - petalLength} 
                          Q ${size/2 + petalWidth} ${size/2 - petalLength/2} ${size/2 + petalWidth/2} ${size/2} Z`;

        const delay = 1.0 + (delayCounter * 0.02);
        delayCounter++;

        petals.push(
          <g 
            key={`sunflower-${layer}-${i}`}
            className="animate-petal"
            style={{ transformOrigin: `${size/2}px ${size/2}px`, animationDelay: `${delay}s` }}
          >
            <path
              d={pathData}
              fill={layer === 0 ? "url(#petal-grad-dark)" : "url(#petal-grad-main)"}
              transform={`rotate(${angle} ${size/2} ${size/2}) translate(0, -${centerRadius * 0.8})`}
              style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
            />
          </g>
        );
      }
    }
    
    const centerBgHue = (mainHue + 30 + Math.floor(seededRandom(12)*100)) % 360;
    const centerBgColor = `hsl(${centerBgHue}, 60%, 15%)`;

    const center = [];
    const centerBaseDelay = 1.0 + (delayCounter * 0.02) + 0.1;

    center.push(
      <circle 
        key="center-bg" 
        cx={size/2} cy={size/2} r={centerRadius} fill={centerBgColor} 
        className="animate-petal"
        style={{ transformOrigin: `${size/2}px ${size/2}px`, animationDelay: `${centerBaseDelay}s` }}
      />
    );
    
    const seedsCount = Math.floor(centerRadius * 1.5); 
    const goldenAngle = 137.5 * (Math.PI / 180);
    for (let i = 1; i <= seedsCount; i++) {
      const r = Math.sqrt(i) * (centerRadius / Math.sqrt(seedsCount)) * 0.9;
      const theta = i * goldenAngle;
      const x = size/2 + r * Math.cos(theta);
      const y = size/2 + r * Math.sin(theta);
      
      const seedDelay = centerBaseDelay + (i * 0.01);

      center.push(
        <circle
          key={`seed-${i}`}
          cx={x}
          cy={y}
          r={size * 0.006}
          fill="url(#center-grad)"
          opacity={0.9}
          className="animate-petal"
          style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${seedDelay}s` }}
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
        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {defs}

      {/* Tallo orgánico */}
      <path
        className="animate-stem"
        d={`M ${size/2 - 8} ${size} 
            Q ${size/2 - 25} ${size*0.7} ${size/2 - 4} ${size*0.42}
            L ${size/2 + 4} ${size*0.42}
            Q ${size/2 - 13} ${size*0.7} ${size/2 + 8} ${size} Z`}
        fill="url(#stem-grad)"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}
      />

      {/* Receptáculo / Sépalo */}
      <g style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
        <path
          d={`M ${size/2 - 4} ${size*0.42}
              C ${size/2 - 15} ${size*0.4} ${size/2 - 25} ${size*0.36} ${size/2 - 35} ${size*0.3}
              Q ${size/2 - 15} ${size*0.36} ${size/2} ${size*0.38}
              Q ${size/2 + 15} ${size*0.36} ${size/2 + 35} ${size*0.3}
              C ${size/2 + 25} ${size*0.36} ${size/2 + 15} ${size*0.4} ${size/2 + 4} ${size*0.42} Z`}
          fill="url(#stem-grad)"
        />
        <path
          d={`M ${size/2 - 8} ${size*0.39}
              Q ${size/2} ${size*0.32} ${size/2 + 8} ${size*0.39} Z`}
          fill="url(#leaf-grad)"
        />
      </g>

      {/* Hojas orgánicas */}
      <g className="animate-leaf" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.2))' }}>
        <path
          d={`M ${size/2 - 14} ${size*0.65} Q ${size/2 - 50} ${size*0.6} ${size/2 - 70} ${size*0.4} Q ${size/2 - 30} ${size*0.35} ${size/2 - 8} ${size*0.55}`}
          fill="url(#leaf-grad)"
          opacity="0.95"
        />
      </g>
      <g className="animate-leaf" style={{ animationDelay: '0.7s', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.2))' }}>
        <path
          d={`M ${size/2 - 2} ${size*0.75} Q ${size/2 + 40} ${size*0.75} ${size/2 + 60} ${size*0.55} Q ${size/2 + 30} ${size*0.45} ${size/2 + 2} ${size*0.65}`}
          fill="url(#leaf-grad)"
          opacity="0.95"
        />
      </g>

      {/* Pétalos y centro generados por el arquetipo */}
      <g transform={`translate(0, -${size * 0.15})`}>
        <g className="animate-breathe" style={{ transformOrigin: `${size/2}px ${size/2}px` }}>
          {renderFlower()}
        </g>
      </g>
    </svg>
  );
}
