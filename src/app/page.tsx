'use client'

import Image from "next/image"
import SpotifyLogo from '@/assets/SpotifyLogo.png'
import { Button } from "@mui/material"

const AuthPage = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth?action=login'
  }

  return (
    <div className="flex w-full flex-col gap-4 items-center justify-center h-screen">
      <Image unoptimized src={SpotifyLogo} alt="Spotify Logo" width={164} height={49} />
      <h1 className="text-sm leading-5 font-medium">Entra com sua conta Spotify clicando no botão abaixo</h1>
      <Button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleLogin}
      >
        Entrar
      </Button>
    </div>
  )
}

export default AuthPage;