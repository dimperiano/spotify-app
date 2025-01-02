import Image from "next/image";
import { Icons } from "../components/Icons"
import SpotifyLogo from '@/assets/SpotifyLogo.png'

export const Sidebar = () => {
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex gap-11 flex-col">
                <Image unoptimized src={SpotifyLogo} alt="Spotify Logo" width={150} height={150} />
                <div className="flex-col gap-6">
                    <div className="flex gap-2 items-center">

                        <Icons.home className="text-neutral-white-0" /> Home
                    </div>
                    <div className="flex gap-2 items-center">

                        <Icons.disc className="text-neutral-white-0" /> Artistas
                    </div>
                    <div className="flex gap-2 items-center">

                        <Icons.play className="text-neutral-white-0" /> PlayLists
                    </div>
                    <div className="flex gap-2 items-center">

                        <Icons.user className="text-neutral-white-0" /> Perfil
                    </div>
                </div>
            </div>

           <div className="flex gap-2 items-center">
           <Icons.grommetIconsInstallOptions className="text-neutral-white-0" /> Instalar PWA
           </div>
        </div>
    )
}
