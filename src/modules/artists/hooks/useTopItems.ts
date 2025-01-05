"use client"

import { useQuery } from "react-query"
import { fetchTopItems } from "@/modules/artists/services/fetchTopItems"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

const useTopItems = (
  type: "artists" | "tracks",
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit: number = 20,
) => {
  return useQuery(
    ["topItems", type, timeRange, limit],
    () => fetchTopItems(type, timeRange, limit),
    {
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
      refetchOnWindowFocus: true,
      onError: (error) => {
        console.error("Error fetching top items:", error)
      },
    },
  )
}

export default useTopItems
