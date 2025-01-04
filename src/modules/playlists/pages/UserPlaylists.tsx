"use client"

import React, { useState } from "react"
import { useUserPlaylists } from "@/modules/playlists/hooks/useUserPlaylists"
import { Button } from "@mui/material"
import PlaylistList from "@/modules/playlists/components/PlaylistList"
import CreatePlaylistDialog from "@/modules/playlists/components/CreatePlaylistDialog"

export const UserPlaylistsPage = () => {
  const { data, isLoading, error } = useUserPlaylists()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading) return <p>Loading playlists...</p>
  if (error) return <p>Error: erro</p>

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

      <PlaylistList playlists={data?.items || []} />

      <CreatePlaylistDialog open={open} onClose={handleClose} />
    </div>
  )
}
