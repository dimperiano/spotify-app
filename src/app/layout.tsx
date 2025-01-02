import "./globals.css";
import { ReactNode } from "react";
import { Rubik } from "@next/font/google";

import { ClientProviders } from "@/providers/ClientProviders";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClientProviders>
        <body
          className={`text-neutral-white-0 bg-neutral-black-10 ${rubik.className}`}
        >
          {children}
        </body>
      </ClientProviders>
    </html>
  );
}
