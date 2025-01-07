import { renderHook, act } from "@testing-library/react-hooks"
import { useCreatePlaylist } from "@/modules/playlists/hooks/useCreatePlaylist"
import { queryClient } from "@/services/queryClient"
import { createPlaylist } from "@/modules/playlists/services/createPlaylist"
import { QueryClientProvider } from "react-query"

jest.mock("@/modules/playlists/services/createPlaylist", () => ({
  createPlaylist: jest.fn(),
}))
jest.spyOn(console, "error").mockImplementation(() => {})

describe("useCreatePlaylist", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should call createPlaylist and invalidate queries on success", async () => {
    ;(createPlaylist as jest.Mock).mockResolvedValueOnce({ data: "success" })
    jest.spyOn(queryClient, "invalidateQueries")

    const { result, waitFor } = renderHook(() => useCreatePlaylist(), {
      wrapper,
    })

    act(() => {
      result.current.mutate({
        name: "My Playlist",
        description: "My Playlist Description",
      })
    })

    await waitFor(() =>
      expect(createPlaylist).toHaveBeenCalledWith({
        name: "My Playlist",
        description: "My Playlist Description",
      }),
    )
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith("userPlaylists")
  })

  it("should log an error when createPlaylist fails", async () => {
    const error = new Error("Failed to create playlist")
    ;(createPlaylist as jest.Mock).mockRejectedValueOnce(error)

    const { result, waitFor } = renderHook(() => useCreatePlaylist(), {
      wrapper,
    })

    act(() => {
      result.current.mutate({ name: "My Playlist", description: "Description" })
    })

    await waitFor(() => {
      expect(createPlaylist).toHaveBeenCalledWith({
        name: "My Playlist",
        description: "Description",
      })
    })

    expect(result.current.error).toEqual(error)
  })
})
