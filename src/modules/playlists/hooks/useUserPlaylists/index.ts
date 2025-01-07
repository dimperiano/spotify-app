"use client"

import { useInfiniteQuery } from "react-query"
import { fetchUserPlaylists } from "@/modules/playlists/services/fetchUserPlaylists"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

export const useUserPlaylists = (limit: number = 10) => {
  return useInfiniteQuery(
    ["userPlaylists"],
    ({ pageParam = 0 }) => fetchUserPlaylists(limit, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { offset, total, limit } = lastPage
        const nextOffset = offset + limit
        return nextOffset < total ? nextOffset : undefined
      },
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
      refetchOnWindowFocus: true,
      onError: (error) => {
        console.error("Error fetching user playlists:", error)
      },
    },
  )
}
