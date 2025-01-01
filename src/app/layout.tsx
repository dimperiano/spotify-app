'use client'

import { QueryClientProvider } from 'react-query';
import './globals.css';
import { ReactNode } from 'react';
import { queryClient } from '@/services/queryClient';
import { Rubik } from '@next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
      <body className={`text-neutral-white-0 bg-neutral-black-10 ${rubik.className}`}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}