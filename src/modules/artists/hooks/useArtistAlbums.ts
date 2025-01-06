import { useInfiniteQuery } from "react-query"
import { fetchArtistAlbums } from "@/modules/artists/services/fetchArtistAlbums"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

export const useArtistAlbums = (artistId: string, limit: number) => {
  return useInfiniteQuery(
    ["artistAlbums", artistId],
    ({ pageParam = 0 }) => fetchArtistAlbums(artistId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { offset, total } = lastPage
        const nextOffset = offset + limit
        return nextOffset < total ? nextOffset : undefined
      },
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
      refetchOnWindowFocus: true,
      onError: (error) => {
        console.error("Error fetching artist albums:", error)
      },
    },
  )
}
