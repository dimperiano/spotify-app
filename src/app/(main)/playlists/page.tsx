"use client";

import React, { useState } from "react";
import useUserPlaylists from "@/hooks/useUserPlaylists";
import Image from "next/image";
import { Playlist } from "@/types";
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import Placeholder from "@/assets/placeholder.svg"
import CloseIcon from "@mui/icons-material/Close"

const UserPlaylists = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data, isLoading, error } = useUserPlaylists();
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePlaylist = () => {
    createPlaylist(
      {
        name: playlistName,
        description: "",
        public: true,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  if (isLoading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: erro</p>;

  return (
    <div className="w-full">
      <div className="p-8">
      <h1 className="text-[28px] font-semibold leading-8"> Minhas Playlists</h1>
      <p className="text-neutral-gray-20">Sua coleção pessoal de playlists</p>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        Criar Playlist
      </Button>

      <ul className="px-8 py-4 flex flex-col gap-4">
      {data?.items.map((playlist: Playlist) => (
        <li key={playlist.id} className="flex items-center gap-4">
          
            <Image
              height={72}
              width={72}
              src={Array.isArray(playlist.images) && playlist.images.length > 0  ? playlist?.images[0]?.url : Placeholder}
              alt={playlist.name}
              className={(!Array.isArray(playlist.images) ? 'border border-neutral-gray-10 p-4' : '')}
            />
          <div>
            <h2 className="text-sm">{playlist.name}</h2>
            <p className="text-xs text-neutral-white-0 opacity-80">
              {!!playlist.description ? playlist.description : "Sem etiqueta"}
            </p>
          </div>
        </li>
      ))}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="!text-sm !font-semibold !text-center !mt-16">Dê um nome a sua playlist</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <Button className="!font-bold" onClick={handleCreatePlaylist} color="primary">
            Criar
          </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPlaylists;
