"use client"

import React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Placeholder from "@/assets/icons/placeholder.svg"
import { Album } from "@/types"
import { CircularProgress } from "@mui/material"
import { useInfiniteScroll } from "@/modules/shared/hooks/useInfiniteScroll"
import { useArtistAlbums } from "../hooks/useArtistAlbums"

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-")
  return `${day}-${month}-${year}`
}

export const ArtistAlbumsList: React.FC = () => {
  const params = useParams<{ id: string }>()
  const artistId = params ? params.id : ""

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useArtistAlbums(artistId, 10)

  const lastElementRef = useInfiniteScroll(fetchNextPage, !!hasNextPage)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
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
    <div>
      <ul className="flex flex-col h-full gap-4 max-h-full pb-8">
        {data?.pages
          .flatMap((page) => page.items)
          .map((album: Album) => (
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
                <span className="text-xs opacity-80">
                  {formatDate(album.release_date)}
                </span>
              </div>
            </li>
          ))}
      </ul>
      <div
        className="w-full flex justify-center items-center mt-8"
        ref={lastElementRef}
      >
        {hasNextPage && isFetchingNextPage && <CircularProgress />}
      </div>
    </div>
  )
}
