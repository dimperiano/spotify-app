import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { PlaylistList } from "."
import { useInfiniteScroll } from "@/modules/shared/hooks/useInfiniteScroll"
import { Playlist } from "@/types"

jest.mock("@/modules/shared/hooks/useInfiniteScroll")

const mockPlaylists: Playlist[] = [
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
]

describe("PlaylistList", () => {
  const fetchNextPageMock = jest.fn()

  beforeEach(() => {
    ;(useInfiniteScroll as jest.Mock).mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders playlists correctly", () => {
    render(
      <PlaylistList
        playlists={mockPlaylists}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
    )

    expect(screen.getByText("Playlist 1")).toBeInTheDocument()
    expect(screen.getByText("Description 1")).toBeInTheDocument()
    expect(screen.getByText("Playlist 2")).toBeInTheDocument()
    expect(screen.getByText("Description 2")).toBeInTheDocument()
  })

  test("calls fetchNextPage when scrolled to the bottom", () => {
    render(
      <PlaylistList
        playlists={mockPlaylists}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={true}
        isFetchingNextPage={false}
      />,
    )

    expect(useInfiniteScroll).toHaveBeenCalledWith(fetchNextPageMock, true)
  })

  test("shows loading spinner when fetching next page", () => {
    render(
      <PlaylistList
        playlists={mockPlaylists}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={true}
        isFetchingNextPage={true}
      />,
    )

    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
