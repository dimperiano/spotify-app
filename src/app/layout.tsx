import './globals.css'; // Importação do Tailwind CSS ou estilos globais
import { ReactNode } from 'react';

export const metadata = {
  title: 'Spotify Authentication',
  description: 'App with Spotify authentication',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}