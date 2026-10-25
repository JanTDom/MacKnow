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
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body className="antialiased selection:bg-mk-primarySoft selection:text-mk-text">
        {children}
      </body>
    </html>
  );
}
