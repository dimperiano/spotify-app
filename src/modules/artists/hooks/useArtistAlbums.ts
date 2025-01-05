import { useQuery } from "react-query"
import { fetchArtistAlbums } from "@/modules/artists/services/fetchArtistAlbums"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

const useArtistAlbums = (artistId: string) => {
  return useQuery(
    ["artistAlbums", artistId],
    () => fetchArtistAlbums(artistId),
    {
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
      refetchOnWindowFocus: true,
    },
  )
}

export default useArtistAlbums
