"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { Playlist } from "@/types"
import Placeholder from "@/assets/icons/placeholder.svg"

interface PlaylistListProps {
  playlists: Playlist[]
  fetchNextPage: () => void
  hasNextPage: boolean
}

const PlaylistList: React.FC<PlaylistListProps> = ({
  playlists,
  fetchNextPage,
  hasNextPage,
}) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPlaylistElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 },
    )

    if (lastPlaylistElementRef.current) {
      observer.current.observe(lastPlaylistElementRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [hasNextPage])

  return (
    <>
      <ul className="px-8 py-4 flex flex-col gap-4">
        {playlists.map((playlist: Playlist) => (
          <li key={playlist.id} className="flex items-center gap-4">
            <Image
              height={72}
              width={72}
              src={
                Array.isArray(playlist.images) && playlist.images.length > 0
                  ? playlist?.images[0]?.url
                  : Placeholder
              }
              alt={playlist.name}
              className={
                !Array.isArray(playlist.images)
                  ? "border border-neutral-gray-10 p-4"
                  : ""
              }
            />
            <div>
              <h2 className="text-sm">{playlist.name}</h2>
              <p className="text-xs text-neutral-white-0 opacity-80">
                {!!playlist.description ? playlist.description : "Sem etiqueta"}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div ref={lastPlaylistElementRef}></div>
    </>
  )
}

export default PlaylistList
