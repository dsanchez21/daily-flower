'use client';

import FlowerGenerator from '@/components/FlowerGenerator';
import { getQuoteForDay } from '@/data/quotes';

interface FlowerCardProps {
  dayNumber: number;
  index: number;
  referenceDate: Date;
}

export default function FlowerCard({ dayNumber, index, referenceDate }: FlowerCardProps) {
  const quote = getQuoteForDay(dayNumber);

  // Calculate the actual date for this day number
  const date = new Date(referenceDate);
  date.setDate(date.getDate() + dayNumber);
  const dateString = date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Get the hue for the background accent (same logic as main page)
  const seededRandom = (day: number, idx: number): number => {
    let h = ((day * 2654435761) ^ (idx * 2246822519)) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };

  const paletteHues = [350, 268, 18, 218, 38, 138, 328, 4];
  let paletteIndex = Math.floor(seededRandom(dayNumber, 50) * paletteHues.length);
  const yesterdayPaletteIndex = Math.floor(seededRandom(dayNumber - 1, 50) * paletteHues.length);
  if (paletteIndex === yesterdayPaletteIndex) {
    paletteIndex = (paletteIndex + 1) % paletteHues.length;
  }
  const mainHue = paletteHues[paletteIndex];

  // Truncate quote for preview
  const truncatedQuote = quote.text.length > 90
    ? quote.text.substring(0, 87) + '...'
    : quote.text;

  return (
    <a
      href={`?day=${dayNumber}`}
      className="flower-card animate-fade-in-up"
      style={{
        animationDelay: `${Math.min(index * 0.06, 1.2)}s`,
        borderLeft: `3px solid hsla(${mainHue}, 60%, 70%, 0.5)`,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Flower thumbnail */}
        <div style={{
          flexShrink: 0,
          width: 100,
          height: 100,
          borderRadius: '16px',
          background: `radial-gradient(circle at 40% 40%, hsla(${mainHue}, 50%, 92%, 0.6), hsla(${mainHue}, 40%, 96%, 0.3))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <FlowerGenerator dayNumber={dayNumber} size={100} />
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '0.8em',
            fontWeight: 700,
            color: `hsl(${mainHue}, 45%, 45%)`,
            textTransform: 'capitalize',
            marginBottom: '6px',
            letterSpacing: '0.3px',
          }}>
            {dateString}
          </p>
          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '0.95em',
            color: '#475569',
            lineHeight: 1.45,
            fontStyle: 'italic',
          }}>
            &ldquo;{truncatedQuote}&rdquo;
          </p>
          {quote.author && (
            <p style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '0.75em',
              color: '#94a3b8',
              marginTop: '4px',
              fontWeight: 600,
            }}>
              — {quote.author}
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <div style={{
          flexShrink: 0,
          color: '#cbd5e1',
          fontSize: '1.1em',
          transition: 'transform 0.25s ease',
        }}>
          ›
        </div>
      </div>

      <style jsx>{`
        .flower-card:hover > div > div:last-child {
          transform: translateX(4px);
        }
      `}</style>
    </a>
  );
}
