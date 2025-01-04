"use client";

import React from "react";
import useTopItems from "@/modules/artists/hooks/useTopItems";
import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/types";
import { useArtist } from "@/context/ArtistContext";

const TopArtists = () => {
  const { data, isLoading, isError, error } = useTopItems(
    "artists",
    "medium_term",
    10,
  );

  const { setArtist } = useArtist();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred."}
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <div className="p-8">
      <h1 className="text-[28px] font-semibold leading-8"> Top Artistas</h1>
      <p className="text-neutral-gray-20">Aqui você encontra seus artistas preferidos</p>
      </div>
      <ul className="px-8 py-4 flex flex-col gap-4">
        {data?.items.map((artist: Artist) => (
          <li key={artist.id} className="flex items-center gap-4">
            <Link
              href={`/artistas/${artist.id}`}
              className="flex items-center gap-4 hover:underline"
              onClick={() => setArtist(artist.name, artist.images[0]?.url || "/placeholder.jpg")}
            >
              <Image
                className="rounded-full object-cover max-w-16 max-h-16 min-w-16 min-h-16"
                src={artist.images[0]?.url || "/placeholder.jpg"}
                alt={artist.name}
                height={64}
                width={64}
              />
              <span className="text-sm">{artist.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
