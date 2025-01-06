"use client"

import React from "react"
import ArtistAlbumsHeader from "@/modules/artists/components/ArtistAlbumsHeader"
import { ArtistAlbumsList } from "@/modules/artists/components/ArtistAlbumsList"

const ArtistAlbumsPage = () => {
  return (
    <div className="p-4 laptop:p-8 h-full w-full">
      <ArtistAlbumsHeader />
      <ArtistAlbumsList />
    </div>
  )
}

export default ArtistAlbumsPage
