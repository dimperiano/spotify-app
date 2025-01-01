'use client'

import { QueryClientProvider } from 'react-query';
import './globals.css';
import { ReactNode } from 'react';
import { queryClient } from '@/services/queryClient';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
      <body className="bg-gray-100 text-gray-900">{children}</body>
      </QueryClientProvider>
    </html>
  );
}