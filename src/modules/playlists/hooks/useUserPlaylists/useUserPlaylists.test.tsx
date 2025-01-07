import { renderHook, act } from "@testing-library/react-hooks"
import { useUserPlaylists } from "@/modules/playlists/hooks/useUserPlaylists"
import { fetchUserPlaylists } from "@/modules/playlists/services/fetchUserPlaylists"
import { QueryClient, QueryClientProvider } from "react-query"

jest.mock("@/modules/playlists/services/fetchUserPlaylists", () => ({
  fetchUserPlaylists: jest.fn(),
}))
jest.spyOn(console, "error").mockImplementation(() => {})

describe("useUserPlaylists", () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should fetch playlists successfully", async () => {
    const mockResponse = {
      offset: 0,
      total: 20,
      limit: 10,
      playlists: [
        { id: 1, name: "Playlist 1" },
        { id: 2, name: "Playlist 2" },
      ],
    }
    ;(fetchUserPlaylists as jest.Mock).mockResolvedValueOnce(mockResponse)

    const { result, waitFor } = renderHook(() => useUserPlaylists(10), {
      wrapper,
    })

    await waitFor(() => result.current.isSuccess)

    expect(fetchUserPlaylists).toHaveBeenCalledWith(10, 0)
    expect(result.current.data?.pages[0]).toEqual(mockResponse)
    expect(result.current.hasNextPage).toBe(true)
  })

  it("should handle pagination and fetch next page", async () => {
    const page1 = {
      offset: 0,
      total: 20,
      limit: 10,
      playlists: [
        { id: 1, name: "Playlist 1" },
        { id: 2, name: "Playlist 2" },
      ],
    }

    ;(fetchUserPlaylists as jest.Mock).mockResolvedValueOnce(page1)

    const { result, waitFor } = renderHook(() => useUserPlaylists(10), {
      wrapper,
    })

    await waitFor(() => result.current.isSuccess)

    act(() => {
      result.current.fetchNextPage()
    })

    await waitFor(() => result.current.isFetchingNextPage === false)

    expect(fetchUserPlaylists).toHaveBeenNthCalledWith(1, 10, 10)
    expect(result.current.data?.pages).toEqual([page1])
  })
})
