'use client';

import { useEffect, useState } from 'react';
import FlowerGenerator from '@/components/FlowerGenerator';
import { getQuoteForDay } from '@/data/quotes';

export default function Home() {
  const [dayNumber, setDayNumber] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Calcular el número de días desde una fecha de referencia
    // Usamos una fecha de referencia para que sea consistente
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

  return (
    <main className="container">
      <div className="content">
        <h1 className="title">Tu Flor del Día</h1>
        <p className="date">{dateString}</p>

        <FlowerGenerator dayNumber={dayNumber} size={300} />

        <div className="quote-container">
          <blockquote className="quote">
            &quot;{quote.text}&quot;
          </blockquote>
          <p className="author">— {quote.author}</p>
        </div>

        <p className="footer">
          Cada día, una nueva flor para ti 🌸
        </p>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .content {
          background: white;
          border-radius: 30px;
          padding: 40px 30px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        .title {
          font-size: 2em;
          color: #333;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .date {
          color: #999;
          font-size: 0.9em;
          text-transform: capitalize;
          margin-bottom: 30px;
        }

        .quote-container {
          margin: 40px 0;
          padding: 30px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px;
          border-left: 5px solid #667eea;
        }

        .quote {
          font-size: 1.2em;
          color: #333;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 15px;
        }

        .author {
          color: #666;
          font-size: 0.95em;
          font-weight: 600;
        }

        .footer {
          color: #999;
          font-size: 0.9em;
          margin-top: 30px;
        }

        @media (max-width: 600px) {
          .content {
            padding: 30px 20px;
            border-radius: 20px;
          }

          .title {
            font-size: 1.5em;
          }

          .quote {
            font-size: 1em;
          }

          .container {
            padding: 10px;
          }
        }

        @media (max-width: 400px) {
          .content {
            padding: 20px 15px;
          }

          .title {
            font-size: 1.3em;
          }

          .quote {
            font-size: 0.9em;
          }
        }
      `}</style>
    </main>
  );
}
