import { Sidebar } from "@/modules/shared/components/Sidebar/SideBar"
import "../globals.css"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full flex-col laptop:flex-row">
      <Sidebar />
      <div className="max-h-full flex-1">{children}</div>
    </div>
  )
}
