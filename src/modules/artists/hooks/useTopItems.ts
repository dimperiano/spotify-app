import { useInfiniteQuery } from "react-query"
import { fetchTopItems } from "@/modules/artists/services/fetchTopItems"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

export const useTopItems = (
  type: "artists" | "tracks",
  timeRange: "short_term" | "medium_term" | "long_term",
  limit: number,
) => {
  return useInfiniteQuery(
    ["topItems", type, timeRange],
    ({ pageParam = 0 }) => fetchTopItems(type, timeRange, limit, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { offset, total } = lastPage
        const nextOffset = offset + limit
        return nextOffset < total ? nextOffset : undefined
      },
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
      refetchOnWindowFocus: true,
    },
  )
}
