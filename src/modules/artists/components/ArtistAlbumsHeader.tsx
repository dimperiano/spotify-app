"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@mui/material"
import { Icons } from "@/app/components/Icons"
import { useArtist } from "@/modules/artists/contexts/ArtistContext"

const ArtistAlbumsHeader = () => {
  const router = useRouter()
  const { artistName, artistImage } = useArtist()

  return (
    <div className="flex mb-12 items-center justify-between w-full ">
      <Button
        variant="text"
        onClick={() => router.back()}
        className="flex !bg-transparent !text-neutral-white-0 !p-0 items-center gap-2"
      >
        <Icons.arrowBack />
        <h2 className="text-xl font-bold">
          {!!artistName ? artistName : "Voltar"}
        </h2>
      </Button>
      {!!artistImage && (
        <Image
          width={64}
          height={64}
          src={artistImage}
          alt={artistName || ""}
          className="rounded-full object-cover max-w-16 max-h-16 min-w-16 min-h-16"
        />
      )}
    </div>
  )
}

export default ArtistAlbumsHeader
