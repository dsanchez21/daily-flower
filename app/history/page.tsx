'use client';

import { useEffect, useState } from 'react';
import FlowerCard from '@/components/FlowerCard';

export default function HistoryPage() {
  const [todayDayNumber, setTodayDayNumber] = useState(0);
  const [mounted, setMounted] = useState(false);
  const referenceDate = new Date(2026, 0, 1);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ref = new Date(2026, 0, 1);
    ref.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((today.getTime() - ref.getTime()) / msPerDay);
    setTodayDayNumber(Math.max(0, days));
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Build the list of days in reverse chronological order (most recent first)
  const days = Array.from({ length: todayDayNumber + 1 }, (_, i) => todayDayNumber - i);

  // Multi-hue animated background
  const bgHue1 = 280;
  const bgHue2 = 340;
  const bgHue3 = 30;

  return (
    <main style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#f8fafc',
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '-15%',
        width: '55vw',
        height: '55vw',
        background: `hsl(${bgHue1}, 70%, 85%)`,
        borderRadius: '50%',
        filter: 'blur(90px)',
        opacity: 0.5,
        animation: 'blob 20s infinite alternate ease-in-out',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-20%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: `hsl(${bgHue2}, 65%, 82%)`,
        borderRadius: '50%',
        filter: 'blur(90px)',
        opacity: 0.45,
        animation: 'blob 18s infinite alternate ease-in-out',
        animationDelay: '-5s',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '55%',
        width: '40vw',
        height: '40vw',
        background: `hsl(${bgHue3}, 70%, 87%)`,
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.4,
        animation: 'blob 22s infinite alternate ease-in-out',
        animationDelay: '-10s',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '640px',
        margin: '0 auto',
        padding: '40px 20px 60px',
      }}>
        {/* Header */}
        <div className="animate-fade-in-up" style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <a
            href="./"
            className="nav-btn"
            style={{
              position: 'absolute',
              left: '20px',
              top: '44px',
            }}
            aria-label="Volver a hoy"
          >
            ←
          </a>

          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '2.4em',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}>
            Mi Jardín 🌿
          </h1>
          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            color: '#64748b',
            fontSize: '1em',
            fontWeight: 500,
          }}>
            {todayDayNumber + 1} flores para ti, una por cada día
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          position: 'relative',
        }}>
          {/* Decorative timeline line */}
          <div style={{
            position: 'absolute',
            left: '18px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(203, 213, 225, 0.3), rgba(203, 213, 225, 0.05))',
            borderRadius: '999px',
            zIndex: 0,
          }} />

          {days.map((dayNum, index) => {
            const isToday = dayNum === todayDayNumber;

            return (
              <div key={dayNum} style={{ position: 'relative', paddingLeft: '42px' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isToday ? '14px' : '10px',
                  height: isToday ? '14px' : '10px',
                  borderRadius: '50%',
                  background: isToday
                    ? 'linear-gradient(135deg, #f472b6, #c084fc)'
                    : 'rgba(148, 163, 184, 0.35)',
                  border: isToday ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  boxShadow: isToday ? '0 0 12px rgba(244, 114, 182, 0.4)' : 'none',
                }} />

                {/* "Hoy" badge for today */}
                {isToday && (
                  <div style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '-6px',
                    background: 'linear-gradient(135deg, #f472b6, #c084fc)',
                    color: 'white',
                    fontSize: '0.65em',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-outfit), sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    zIndex: 2,
                  }}>
                    Hoy
                  </div>
                )}

                <FlowerCard
                  dayNumber={dayNum}
                  index={index}
                  referenceDate={referenceDate}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="animate-fade-in-up" style={{
          textAlign: 'center',
          marginTop: '50px',
          animationDelay: '0.5s',
        }}>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.9em',
            fontWeight: 500,
            fontFamily: 'var(--font-outfit), sans-serif',
          }}>
            Cada día, una nueva flor para ti 🌸<br />
            Te amo Ruth.
          </p>
        </div>
      </div>
    </main>
  );
}
