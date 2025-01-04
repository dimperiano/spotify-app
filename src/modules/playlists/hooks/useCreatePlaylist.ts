"use client"

import { useMutation } from "react-query"
import { queryClient } from "@/services/queryClient"
import { createPlaylist } from "@/modules/playlists/services/createPlaylist"

export const useCreatePlaylist = () => {
  return useMutation(createPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("userPlaylists")
    },
    onError: (error) => {
      console.error("Error creating playlist:", error)
    },
  })
}

export default useCreatePlaylist
