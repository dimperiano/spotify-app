import { ArtistResponse } from "@/types"

export const fetchTopItems = async (
  type: "artists" | "tracks",
  timeRange: "short_term" | "medium_term" | "long_term",
  limit: number,
  offset: number = 0,
): Promise<ArtistResponse> => {
  const tokenResponse = await fetch("/api/get-access-token")
  const tokenData = await tokenResponse.json()

  const accessToken = tokenData.access_token

  if (!accessToken) {
    window.location.href = "/"
  }

  const url = new URL(`https://api.spotify.com/v1/me/top/${type}`)
  url.searchParams.append("time_range", timeRange)
  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("offset", offset.toString())

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch top items: ${response.statusText}`)
  }

  return response.json()
}
