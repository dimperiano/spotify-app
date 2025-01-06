import React, { useState } from "react"
import { Drawer, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import SpotifyLogo from "@/assets/SpotifyLogo.png"
import { Icons } from "@/modules/shared/components/Icons"
import { MenuItem } from "@/modules/shared/components/Sidebar/MenuItem"

export const SidebarMobile = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state)
  }

  return (
    <div className="relative h-24">
      <div className="px-8 fixed z-50 py-4 flex w-full items-center justify-between mb-6 bg-neutral-black-0">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: "240px", bgcolor: "black" },
          }}
        >
          <div className="flex flex-col h-screen pt-8 pb-3">
            <div className="flex-col flex pl-8 h-full flex-1 gap-6">
              <MenuItem
                href="/home"
                icon={<Icons.home />}
                label="Home"
                closeDrawer={() => setOpen(false)}
              />
              <MenuItem
                href="/artistas"
                icon={<Icons.disc />}
                label="Artistas"
                closeDrawer={() => setOpen(false)}
              />
              <MenuItem
                href="/playlists"
                icon={<Icons.play />}
                label="PlayLists"
                closeDrawer={() => setOpen(false)}
              />
              <MenuItem
                href="/perfil"
                icon={<Icons.user />}
                label="Perfil"
                closeDrawer={() => setOpen(false)}
              />
            </div>

            <div className="flex pl-8 gap-7 items-center mt-auto">
              <Icons.grommetIconsInstallOptions className="text-neutral-white-0" />
              Instalar PWA
            </div>
          </div>
        </Drawer>
        <Image
          priority
          src={SpotifyLogo}
          alt="Spotify Logo"
          width={164}
          height={49}
          onClick={() => window.location.replace("/home")}
        />
      </div>
    </div>
  )
}
