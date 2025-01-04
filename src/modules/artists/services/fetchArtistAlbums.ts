import { AlbumsResponse } from "@/types"

export const fetchArtistAlbums = async (
  artistId: string,
): Promise<AlbumsResponse> => {
  const tokenResponse = await fetch("/api/get-access-token")
  const tokenData = await tokenResponse.json()

  const accessToken = tokenData.access_token

  if (!accessToken) {
    throw new Error("Access token is missing")
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Error fetching artist albums: ${response.statusText}`)
  }

  return response.json()
}
