import React from 'react';
import './globals.css';

export const metadata = {
  title: 'MacKnow – Twój przewodnik po MacBooku',
  description: 'Osobisty przewodnik po systemie macOS stworzony dla Małgorzaty.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
