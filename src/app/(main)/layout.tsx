import "../globals.css";
import { ReactNode } from "react";
import { Sidebar } from "@/app/components/SideBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      {children}
    </div>
  );
}
