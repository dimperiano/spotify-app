export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("spotifyAccessToken", accessToken);
  localStorage.setItem("spotifyRefreshToken", refreshToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("spotifyAccessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("spotifyRefreshToken");
};
