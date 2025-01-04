"use client"

import { Button } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"

type MenuItemProps = {
  href: string
  icon: ReactNode
  label: string
  closeDrawer?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  href,
  icon,
  label,
  closeDrawer,
}) => {
  const pathName = usePathname()

  const router = useRouter()

  const isActive = pathName?.startsWith(href)

  const handleClick = () => {
    router.push(href)
    if (closeDrawer) {
      closeDrawer()
    }
  }

  return (
    <Button
      variant="text"
      className={`${isActive ? "text-white" : "text-neutral-gray-10"} !bg-transparent !text-neutral-white-0 !p-0`}
      onClick={handleClick}
    >
      <div
        className={`flex gap-4 items-center font-bold ${isActive ? "text-white" : "text-neutral-gray-10"}`}
      >
        {icon} {label}
      </div>
    </Button>
  )
}
