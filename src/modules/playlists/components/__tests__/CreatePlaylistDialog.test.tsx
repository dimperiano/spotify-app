import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { CreatePlaylistDialog } from "../CreatePlaylistDialog"
import { useCreatePlaylist } from "@/modules/playlists/hooks/useCreatePlaylist"

jest.mock("@/modules/playlists/hooks/useCreatePlaylist")

describe("CreatePlaylistDialog", () => {
  const onCloseMock = jest.fn()
  const createPlaylistMock = jest.fn()

  beforeEach(() => {
    ;(useCreatePlaylist as jest.Mock).mockReturnValue({
      mutate: createPlaylistMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders dialog correctly", () => {
    render(<CreatePlaylistDialog open={true} onClose={onCloseMock} />)
    expect(screen.getByText("Dê um nome a sua playlist")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("As Melhores")).toBeInTheDocument()
    expect(screen.getByText("Criar")).toBeInTheDocument()
  })

  test("input field updates correctly", () => {
    render(<CreatePlaylistDialog open={true} onClose={onCloseMock} />)
    const input = screen.getByPlaceholderText("As Melhores")
    fireEvent.change(input, { target: { value: "New Playlist" } })
    expect(input).toHaveValue("New Playlist")
  })

  test("create button triggers create playlist function", () => {
    render(<CreatePlaylistDialog open={true} onClose={onCloseMock} />)
    const input = screen.getByPlaceholderText("As Melhores")
    fireEvent.change(input, { target: { value: "New Playlist" } })
    const createButton = screen.getByText("Criar")
    fireEvent.click(createButton)
    expect(createPlaylistMock).toHaveBeenCalledWith(
      { name: "New Playlist", description: "", public: true },
      { onSuccess: expect.any(Function) },
    )
  })

  test("dialog closes on clicking close button", () => {
    render(<CreatePlaylistDialog open={true} onClose={onCloseMock} />)
    const closeButton = screen.getByLabelText("close")
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
