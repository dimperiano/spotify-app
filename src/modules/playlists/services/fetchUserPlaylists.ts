import { PlaylistsResponse } from "@/types"

export const fetchUserPlaylists = async (
  limit: number = 5,
  offset: number = 0,
): Promise<PlaylistsResponse> => {
  const tokenResponse = await fetch("/api/get-access-token")
  const tokenData = await tokenResponse.json()

  const accessToken = tokenData.access_token

  if (!accessToken) {
    window.location.href = "/"
  }

  const url = new URL("https://api.spotify.com/v1/me/playlists")
  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("offset", offset.toString())

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch playlists: ${response.statusText}`)
  }

  return response.json()
}
