import React, { useState } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Input,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useCreatePlaylist } from "@/modules/playlists/hooks/useCreatePlaylist"

interface CreatePlaylistDialogProps {
  open: boolean
  onClose: () => void
}

export const CreatePlaylistDialog: React.FC<CreatePlaylistDialogProps> = ({
  open,
  onClose,
}) => {
  const [playlistName, setPlaylistName] = useState("")
  const { mutate: createPlaylist } = useCreatePlaylist()

  const handleCreatePlaylist = () => {
    createPlaylist(
      {
        name: playlistName,
        description: "",
        public: true,
      },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="!text-sm !font-semibold !text-center !mt-16">
        Dê um nome a sua playlist
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 6,
          top: 6,
          color: (theme) => theme.palette.common.white,
        }}
      >
        <CloseIcon sx={{ width: 32, height: 32, strokeWidth: 1 }} />
      </IconButton>
      <DialogContent>
        <Input
          autoFocus
          margin="dense"
          id="name"
          placeholder="As Melhores"
          type="text"
          fullWidth={false}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="!text-2xl !font-semibold !text-center !flex !justify-center"
        />
      </DialogContent>
      <DialogActions>
        <div className="flex justify-center w-full mt-16">
          <Button
            className="!font-bold"
            onClick={handleCreatePlaylist}
            color="primary"
          >
            Criar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}
