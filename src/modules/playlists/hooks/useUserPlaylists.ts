"use client"

import { useQuery } from "react-query"
import { fetchUserPlaylists } from "@/modules/playlists/services/fetchUserPlaylists"

export const useUserPlaylists = (limit: number = 20, offset: number = 0) => {
  return useQuery(
    ["userPlaylists", limit, offset],
    () => fetchUserPlaylists(limit, offset),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching user playlists:", error)
      },
    },
  )
}
