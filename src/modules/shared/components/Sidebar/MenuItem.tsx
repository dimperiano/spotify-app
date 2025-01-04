"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type MenuItemProps = {
  href: string
  icon: ReactNode
  label: string
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label }) => {
  const pathName = usePathname()

  const isActive = pathName?.startsWith(href)

  return (
    <Link
      href={href}
      className={`${isActive ? "text-white" : "text-neutral-gray-10"}`}
    >
      <div
        className={`flex gap-4 items-center font-bold ${isActive ? "text-white" : "text-neutral-gray-10"}`}
      >
        {icon} {label}
      </div>
    </Link>
  )
}
