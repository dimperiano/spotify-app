"use client"

import React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import useArtistAlbums from "@/modules/artists/hooks/useArtistAlbums"
import Placeholder from "@/assets/icons/placeholder.svg"
import { Album } from "@/types"

const ArtistAlbumsList = () => {
  const params = useParams<{ id: string }>()
  const artistId = params ? params.id : ""
  const { data, isLoading, isError, error } = useArtistAlbums(artistId)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <p>Carregando</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to load albums."}
      </div>
    )
  }

  return (
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
  )
}

export default ArtistAlbumsList
