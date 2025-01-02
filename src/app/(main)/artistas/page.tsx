"use client";

import React from "react";
import useTopItems from "@/hooks/useTopItems";
import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/types";

const TopArtists = () => {
  const { data, isLoading, isError, error } = useTopItems(
    "artists",
    "medium_term",
    10,
  );

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
    <div className="p-4 bg-neutral-black-10">
      <h2 className="text-xl font-bold mb-4">Top Artistas</h2>
      <ul className="space-y-2">
        {data?.items.map((artist: Artist) => (
          <li key={artist.id} className="flex items-center gap-4">
            <Link
              href={`/artistas/${artist.id}`}
              className="flex items-center gap-4 hover:underline"
            >
              <Image
                className="rounded-full object-cover"
                src={artist.images[0]?.url || "/placeholder.jpg"}
                alt={artist.name}
                height={50}
                width={50}
              />
              <span className="text-lg font-medium">{artist.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
