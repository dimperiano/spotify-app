import { useQuery } from "react-query"
import { fetchArtistAlbums } from "@/modules/artists/services/fetchArtistAlbums"

const useArtistAlbums = (artistId: string) => {
  return useQuery(
    ["artistAlbums", artistId],
    () => fetchArtistAlbums(artistId),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  )
}

export default useArtistAlbums
