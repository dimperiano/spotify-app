"use client"

import { useInfiniteQuery } from "react-query"
import { fetchUserPlaylists } from "@/modules/playlists/services/fetchUserPlaylists"

export const useUserPlaylists = (limit: number = 5) => {
  return useInfiniteQuery(
    ["userPlaylists"],
    ({ pageParam = 0 }) => fetchUserPlaylists(limit, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { offset, total, limit } = lastPage
        const nextOffset = offset + limit
        return nextOffset < total ? nextOffset : undefined
      },
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching user playlists:", error)
      },
    },
  )
}
