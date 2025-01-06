"use client"

import React, { useState } from "react"
import { useUserPlaylists } from "@/modules/playlists/hooks/useUserPlaylists"
import { Button, CircularProgress } from "@mui/material"
import PlaylistList from "@/modules/playlists/components/PlaylistList"
import CreatePlaylistDialog from "@/modules/playlists/components/CreatePlaylistDialog"

export const UserPlaylistsPage = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  } = useUserPlaylists()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <CircularProgress />
      </div>
    )
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <p>Error</p>
      </div>
    )

  return (
    <div className="w-full">
      <div className="flex w-full justify-between tablet:items-center p-8 flex-col-reverse gap-2 tablet:flex-row">
        <div>
          <h1 className="text-[28px] font-semibold leading-8">
            Minhas Playlists
          </h1>
          <p className="text-neutral-gray-20">
            Sua coleção pessoal de playlists
          </p>
        </div>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Criar Playlist
        </Button>
      </div>

      <PlaylistList
        playlists={data?.pages.flatMap((page) => page.items) || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />

      <CreatePlaylistDialog open={open} onClose={handleClose} />
    </div>
  )
}
