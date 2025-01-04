import Image from "next/image"
import { Icons } from "../Icons"
import SpotifyLogo from "@/assets/SpotifyLogo.png"
import { MenuItem } from "./MenuItem"

export const SidebarDesktop = () => {
  return (
    <div className="flex w-full max-w-64 flex-col bg-neutral-black-0 justify-between h-screen pt-8 pb-3">
      <div className="flex gap-11 flex-col h-full">
        <Image
          unoptimized
          src={SpotifyLogo}
          alt="Spotify Logo"
          width={164}
          height={49}
          className="pl-7"
        />
        <div className="flex-col flex pl-8 h-full flex-1 gap-6">
          <MenuItem href="/home" icon={<Icons.home />} label="Home" />
          <MenuItem href="/artistas" icon={<Icons.disc />} label="Artistas" />
          <MenuItem href="/playlists" icon={<Icons.play />} label="PlayLists" />
          <MenuItem href="/perfil" icon={<Icons.user />} label="Perfil" />
        </div>
      </div>
      <div className="flex pl-8 gap-7 items-center">
        <Icons.grommetIconsInstallOptions className="text-neutral-white-0" />{" "}
        Instalar PWA
      </div>
    </div>
  )
}
