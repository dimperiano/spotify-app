"use client";

import React from "react";
import { useParams } from "next/navigation";
import useArtistAlbums from "@/hooks/useArtistAlbums";
import Image from "next/image";
import { Album } from "@/types";

const ArtistAlbums = () => {
  const params = useParams<{ id: string }>();
  const artistId = params ? params.id : "";

  const { data, isLoading, isError, error } = useArtistAlbums(artistId);

  if (isLoading) {
    return <div>Loading albums...</div>;
  }

  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to load albums."}
      </div>
    );
  }

  return (
    <div className="p-4 bg-neutral-black-10 w-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">voltar</h2>
      <ul className="flex flex-col gap-4 overflow-y-auto">
        {data?.items.map((album: Album) => (
          <li key={album.id} className="flex items-center gap-2">
            <Image
              src={album.images[0]?.url || "/placeholder.jpg"}
              alt={album.name}
              height={72}
              width={72}
              className="object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="mt-2 text-sm">{album.name}</span>
              <span className="text-xs opacity-80">{album.release_date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistAlbums;
