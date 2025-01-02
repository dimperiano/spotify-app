import { useQuery } from "react-query";
import axios from "axios";

const fetchArtistAlbums = async (artistId: string) => {
  const tokenResponse = await axios.get("/api/get-access-token");

  const accessToken = tokenResponse.data.access_token;

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    },
  );

  return response.data;
};

const useArtistAlbums = (artistId: string) => {
  return useQuery(
    ["artistAlbums", artistId],
    () => fetchArtistAlbums(artistId),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  );
};

export default useArtistAlbums;
