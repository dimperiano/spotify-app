"use client";

import { useQuery } from "react-query";
import axios from "axios";
import { PlaylistsResponse } from "@/types";

const fetchUserPlaylists = async (limit: number = 20, offset: number = 0) => {
  const tokenResponse = await axios.get("/api/get-access-token");
  const accessToken = tokenResponse.data.access_token;

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get<PlaylistsResponse>(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        params: {
          limit,
          offset,
        },
      },
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Failed to fetch playlists", error);
  }
};

const useUserPlaylists = (limit: number = 20, offset: number = 0) => {
  return useQuery(
    ["userPlaylists", limit, offset],
    () => fetchUserPlaylists(limit, offset),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching user playlists:", error);
      },
    },
  );
};

export default useUserPlaylists;
