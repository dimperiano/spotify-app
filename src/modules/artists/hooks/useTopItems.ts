"use client"

import { useQuery } from "react-query"
import { fetchTopItems } from "@/modules/artists/services/fetchTopItems"

const useTopItems = (
  type: "artists" | "tracks",
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit: number = 20,
) => {
  return useQuery(
    ["topItems", type, timeRange, limit],
    () => fetchTopItems(type, timeRange, limit),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching top items:", error)
      },
    },
  )
}

export default useTopItems
