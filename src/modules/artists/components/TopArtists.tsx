"use client"

import React from "react"
import TopArtistsClient from "@/modules/artists/components/TopArtistsClient"
import { CircularProgress } from "@mui/material"
import { useInfiniteScroll } from "@/modules/shared/hooks/useInfiniteScroll"
import { useTopItems } from "@/modules/artists/hooks/useTopItems"

export const TopArtistsPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTopItems("artists", "medium_term", 10)

  const lastElementRef = useInfiniteScroll(fetchNextPage, !!hasNextPage)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
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

  return (
    <div className="p-4 w-full">
      <TopArtistsClient
        data={data?.pages.flatMap((page) => page.items) ?? []}
      />
      <div
        className="flex justify-center items-center mt-8"
        ref={lastElementRef}
      >
        {isFetchingNextPage && <CircularProgress />}
      </div>
    </div>
  )
}
