import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tu Flor del Día',
  description: 'Una flor única y una cita hermosa cada día',
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🌸</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
