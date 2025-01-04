"use client";

import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "@/services/queryClient";

interface CreatePlaylistResponse {
  name: string;
  description?: string;
  images?: { url: string }[];
}

interface CreatePlaylistPayload {
  name: string;
  description: string;
  public?: boolean;
}

const createPlaylist = async (payload: CreatePlaylistPayload) => {
  const tokenResponse = await axios.get("/api/get-access-token");
  const accessToken = tokenResponse.data.access_token;

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.post<CreatePlaylistResponse>(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: payload.name,
        description: payload.description,
        public: payload.public || false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Failed to create playlist", error);
  }
};

export const useCreatePlaylist = () => {
  return useMutation(createPlaylist, {
    onSuccess: () => {
     queryClient.invalidateQueries("userPlaylists");
    },
    onError: (error) => {
      console.error("Error creating playlist:", error);
    },
  });
};

export default useCreatePlaylist;
