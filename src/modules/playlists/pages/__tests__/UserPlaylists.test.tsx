import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { UserPlaylistsPage } from "../UserPlaylists"
import { useUserPlaylists } from "@/modules/playlists/hooks/useUserPlaylists"

jest.mock("@/modules/playlists/hooks/useUserPlaylists")

const queryClient = new QueryClient()

const intersectionObserverMock = () => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
})

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

describe("UserPlaylistsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders loading state", () => {
    ;(useUserPlaylists as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserPlaylistsPage />
      </QueryClientProvider>,
    )

    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("renders error state", () => {
    ;(useUserPlaylists as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetchingNextPage: false,
      error: new Error("Error fetching playlists"),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserPlaylistsPage />
      </QueryClientProvider>,
    )

    expect(screen.getByText("Error")).toBeInTheDocument()
  })

  it("renders playlists", () => {
    ;(useUserPlaylists as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            items: [
              {
                id: "1",
                name: "Playlist 1",
                description: "Description 1",
                images: [{ url: "https://example.com/image1.jpg" }],
                tracks: { total: 10 },
              },
              {
                id: "2",
                name: "Playlist 2",
                description: "Description 2",
                images: [{ url: "https://example.com/image1.jpg" }],
                tracks: { total: 20 },
              },
            ],
          },
        ],
      },
      isLoading: false,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserPlaylistsPage />
      </QueryClientProvider>,
    )

    expect(screen.getByText("Playlist 1")).toBeInTheDocument()
    expect(screen.getByText("Playlist 2")).toBeInTheDocument()
  })

  it("open CreatePlaylistDialog", () => {
    ;(useUserPlaylists as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            items: [],
          },
        ],
      },
      isLoading: false,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserPlaylistsPage />
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByText("Criar Playlist"))
    expect(screen.getByText("Dê um nome a sua playlist")).toBeInTheDocument()
  })
})
