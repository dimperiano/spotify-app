"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Artist } from "@/types"
import { useArtist } from "@/modules/artists/contexts/ArtistContext"

interface TopArtistsClientProps {
  data: Artist[]
}

const TopArtistsClient: React.FC<TopArtistsClientProps> = ({ data }) => {
  const { setArtist } = useArtist()

  return (
    <div className="p-4 w-full">
      <div className="p-4 laptop:px-8 laptop:py-4">
        <h1 className="text-[28px] font-semibold leading-8"> Top Artistas</h1>
        <p className="text-neutral-gray-20">
          Aqui você encontra seus artistas preferidos
        </p>
      </div>
      <ul className="p-4 laptop:px-8 laptop:py-4 flex flex-col gap-4">
        {data.map((artist) => (
          <li key={artist.id} className="flex items-center gap-4">
            <Link
              href={`/artistas/${artist.id}`}
              className="flex items-center gap-4 hover:underline"
              onClick={() =>
                setArtist(
                  artist.name,
                  artist.images[0]?.url || "/placeholder.jpg",
                )
              }
            >
              <Image
                className="rounded-full object-cover max-w-16 max-h-16 min-w-16 min-h-16"
                src={artist.images[0]?.url || "/placeholder.jpg"}
                alt={artist.name}
                height={64}
                width={64}
              />
              <span className="text-sm">{artist.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopArtistsClient
