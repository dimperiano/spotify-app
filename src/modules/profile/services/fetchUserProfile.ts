import { UserProfile } from "@/types"

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const tokenResponse = await fetch("/api/get-access-token")

  if (!tokenResponse.ok) {
    throw new Error("Failed to fetch access token")
  }

  const { access_token } = await tokenResponse.json()

  if (!access_token) {
    throw new Error("Access token is missing")
  }
  const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token.value}`,
    },
  })

  if (!userProfileResponse.ok) {
    throw new Error(
      `Failed to fetch user profile: ${userProfileResponse.statusText}`,
    )
  }

  return userProfileResponse.json() as Promise<UserProfile>
}
