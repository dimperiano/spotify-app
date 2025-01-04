"use client"

import React from "react"
import { useMediaQuery } from "@mui/material"
import { SidebarDesktop } from "@/modules/shared/components/Sidebar/SidebarDesktop"
import { SidebarMobile } from "@/modules/shared/components/Sidebar/SidebarMobile"

export const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width:1025px)")

  return isDesktop ? <SidebarDesktop /> : <SidebarMobile />
}
