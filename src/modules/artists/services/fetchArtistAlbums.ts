import { AlbumsResponse } from "@/types"

export const fetchArtistAlbums = async (
  artistId: string,
  offset: number = 0,
  limit: number = 10,
): Promise<AlbumsResponse> => {
  const tokenResponse = await fetch("/api/get-access-token")
  const tokenData = await tokenResponse.json()

  const accessToken = tokenData.access_token

  if (!accessToken) {
    window.location.href = "/"
  }

  const url = new URL(`https://api.spotify.com/v1/artists/${artistId}/albums`)
  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("offset", offset.toString())

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching artist albums: ${response.statusText}`)
  }

  return response.json()
}
