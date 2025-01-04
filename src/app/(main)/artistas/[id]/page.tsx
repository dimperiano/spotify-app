"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import useArtistAlbums from "@/modules/artists/hooks/useArtistAlbums"
import Image from "next/image";
import { Album } from "@/types";
import { Icons } from "@/app/components/Icons"
import { Button } from "@mui/material"
import Placeholder from "@/assets/placeholder.svg"
import { useArtist } from "@/context/ArtistContext";

const ArtistAlbums = () => {
  const params = useParams<{ id: string }>()
  const artistId = params ? params.id : ""
  const router = useRouter()
  const { data, isLoading, isError, error } = useArtistAlbums(artistId)

  const { artistName, artistImage } = useArtist()

  if (isLoading) {
    return <div>Loading albums...</div>;
  }

  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to load albums."}
      </div>
    );
  }

  return (
    <div className="p-8 h-full w-full">
      <div className="flex mb-12 items-center justify-between w-full ">
        <Button variant="text" onClick={() => router.back()} className="flex !bg-transparent !text-neutral-white-0 !p-0 items-center gap-2">
          <Icons.arrowBack />
          <h2 className="text-xl font-bold"> {!!artistName ? artistName : 'Voltar'}</h2>
        </Button>
        {!!artistImage && <Image width={64} height={64} src={artistImage} alt={artistName || ''} className="rounded-full object-cover max-w-16 max-h-16 min-w-16 min-h-16" />}
      </div>
      <ul className="flex flex-col h-full gap-4 max-h-full pb-8">
        {data?.items.map((album: Album) => (
          <li key={album.id} className="flex items-center gap-2">
            <Image
              src={album.images[0]?.url || Placeholder}
              alt={album.name}
              height={72}
              width={72}
              className="object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="mt-2 text-sm">{album.name}</span>
              <span className="text-xs opacity-80">{album.release_date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArtistAlbums;