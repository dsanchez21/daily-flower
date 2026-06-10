'use client';

import { useEffect, useState } from 'react';
import FlowerGenerator from '@/components/FlowerGenerator';
import { getQuoteForDay } from '@/data/quotes';

export default function Home() {
  const [dayNumber, setDayNumber] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Calcular el número de días desde una fecha de referencia
    const referenceDate = new Date('2026-01-01');
    const today = new Date();

    // Resetear horas para comparar solo fechas
    today.setHours(0, 0, 0, 0);
    referenceDate.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((today.getTime() - referenceDate.getTime()) / msPerDay);

    setDayNumber(Math.max(0, days));
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const quote = getQuoteForDay(dayNumber);
  const today = new Date();
  const dateString = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Match the flower's curated watercolor palette for background harmony
  const seededRandom = (day: number, index: number): number => {
    let h = ((day * 2654435761) ^ (index * 2246822519)) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
  const paletteHues = [350, 268, 18, 218, 38, 138, 328, 4]; // matches FlowerGenerator palettes
  let paletteIndex = Math.floor(seededRandom(dayNumber, 50) * paletteHues.length);
  const yesterdayPaletteIndex = Math.floor(seededRandom(dayNumber - 1, 50) * paletteHues.length);
  if (paletteIndex === yesterdayPaletteIndex) {
    paletteIndex = (paletteIndex + 1) % paletteHues.length;
  }
  const mainHue = paletteHues[paletteIndex];

  return (
    <main className="container" style={{ '--hue': mainHue } as React.CSSProperties}>
      {/* Fondo Dinámico con Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Tarjeta de Cristal */}
      <div className="content">
        <h1 className="title">Tu Flor del Día</h1>
        <p className="date">{dateString}</p>

        <FlowerGenerator dayNumber={dayNumber} size={300} />

        <div className="quote-container">
          <blockquote className="quote">
            {quote.text}
          </blockquote>
          {quote.author && <div className="author">— {quote.author}</div>}
        </div>

        <p className="footer">
          Cada día, una nueva flor para ti 🌸<br />
          Te amo Ruth.
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
          background-color: #f8fafc;
        }

        .blob {
          position: absolute;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.6;
          border-radius: 50%;
          animation: blob 15s infinite alternate ease-in-out;
        }

        .blob-1 {
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: hsl(var(--hue), 80%, 80%);
          animation-delay: 0s;
        }

        .blob-2 {
          bottom: -20%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: hsl(calc(var(--hue) + 40), 80%, 75%);
          animation-delay: -3s;
        }

        .blob-3 {
          top: 40%;
          left: 60%;
          width: 40vw;
          height: 40vw;
          background: hsl(calc(var(--hue) - 30), 80%, 85%);
          animation-delay: -6s;
        }

        .content {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 30px;
          padding: 50px 40px;
          max-width: 550px;
          width: 100%;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.4);
          text-align: center;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .title {
          font-size: 2.2em;
          color: #0f172a;
          margin-bottom: 5px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .date {
          color: #64748b;
          font-size: 1em;
          text-transform: capitalize;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .quote-container {
          margin: 40px 0 20px 0;
          padding: 0 20px;
          position: relative;
        }

        .quote-mark {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-playfair), serif;
          font-size: 140px;
          color: rgba(0, 0, 0, 0.04);
          z-index: -1;
          line-height: 1;
          user-select: none;
        }

        .quote {
          font-family: var(--font-playfair), serif;
          font-size: 1.4em;
          color: #334155;
          line-height: 1.5;
          font-style: italic;
          position: relative;
          z-index: 1;
        }

        .author {
          font-family: var(--font-outfit), sans-serif;
          color: #64748b;
          font-size: 0.95em;
          font-weight: 600;
          margin-top: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer {
          color: #94a3b8;
          font-size: 0.9em;
          margin-top: 40px;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .content {
            padding: 40px 20px;
            border-radius: 24px;
          }

          .title {
            font-size: 1.8em;
          }

          .quote {
            font-size: 1.2em;
          }
          
          .blob {
            filter: blur(50px);
          }
        }
      `}</style>
    </main>
  );
}
