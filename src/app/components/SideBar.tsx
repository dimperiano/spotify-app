import Image from "next/image";
import { Icons } from "../components/Icons";
import SpotifyLogo from "@/assets/SpotifyLogo.png";
import Link from "next/link";

export const Sidebar = () => {
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
          <Link href={"/home"} className="flex gap-6 items-center">
            <Icons.home className="text-neutral-white-0" /> Home
          </Link>
          <Link href={"/artistas"} className="flex gap-6 items-center">
            <Icons.disc className="text-neutral-white-0" /> Artistas
          </Link>
          <Link href={"/playlists"} className="flex gap-6 items-center">
            <Icons.play className="text-neutral-white-0" /> PlayLists
          </Link>
          <Link href={"/perfil"} className="flex gap-6 items-center">
            <Icons.user className="text-neutral-white-0" /> Perfil
          </Link>
        </div>
      </div>
      <div className="flex pl-8 gap-7 items-center">
        <Icons.grommetIconsInstallOptions className="text-neutral-white-0" />{" "}
        Instalar PWA
      </div>
    </div>
  );
};
