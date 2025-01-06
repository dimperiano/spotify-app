"use client"

import React from "react"
import TopArtistsClient from "@/modules/artists/components/TopArtistsClient"
import useTopItems from "@/modules/artists/hooks/useTopItems"
import { CircularProgress } from "@mui/material"

export const TopArtistsPage = () => {
  const { data, isLoading, isError, error } = useTopItems(
    "artists",
    "medium_term",
    10,
  )

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred."}
      </div>
    )
  }

  return <TopArtistsClient data={data?.items ?? []} />
}
