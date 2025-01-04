import Image from "next/image"
import SpotifyLogo from "@/assets/SpotifyLogo.png"
import { LoginButton } from "@/modules/shared/components/LoginButton"

const AuthPage = () => {
  return (
    <div className="flex w-full flex-col gap-4 items-center justify-center h-screen">
      <Image
        unoptimized
        src={SpotifyLogo}
        alt="Spotify Logo"
        width={164}
        height={49}
      />
      <h1 className="text-sm leading-5 font-medium">
        Entra com sua conta Spotify clicando no botão abaixo
      </h1>
      <LoginButton />
    </div>
  )
}

export default AuthPage
