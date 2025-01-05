"use client"

import React, { useState, useEffect } from "react"
import { useMediaQuery } from "@mui/material"
import { SidebarDesktop } from "@/modules/shared/components/Sidebar/SidebarDesktop"
import { SidebarMobile } from "@/modules/shared/components/Sidebar/SidebarMobile"

export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useMediaQuery("(min-width:1025px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div />
  }

  return isDesktop ? <SidebarDesktop /> : <SidebarMobile />
}
