"use client"

import { useQuery } from "react-query"
import axios from "axios"
import { ArtistResponse } from "@/types"

const fetchTopItems = async (
  type: "artists" | "tracks",
  timeRange: "short_term" | "medium_term" | "long_term",
  limit: number,
) => {
  const tokenResponse = await axios.get("/api/get-access-token")

  const accessToken = tokenResponse.data.access_token

  if (!accessToken) {
    throw new Error("Access token is missing")
  }

  try {
    const response = await axios.get<ArtistResponse>(
      `https://api.spotify.com/v1/me/top/${type}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        params: {
          time_range: timeRange,
          limit,
        },
      },
    )
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Failed to fetch top items", error)
  }
}

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
