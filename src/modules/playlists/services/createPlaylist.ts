interface CreatePlaylistResponse {
  name: string
  description?: string
  images?: { url: string }[]
}

interface CreatePlaylistPayload {
  name: string
  description: string
  public?: boolean
}

export const createPlaylist = async (
  payload: CreatePlaylistPayload,
): Promise<CreatePlaylistResponse> => {
  const tokenResponse = await fetch("/api/get-access-token")
  const tokenData = await tokenResponse.json()

  const accessToken = tokenData.access_token

  if (!accessToken) {
    throw new Error("Access token is missing")
  }

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      description: payload.description,
      public: payload.public || false,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create playlist: ${response.statusText}`)
  }

  return response.json()
}
