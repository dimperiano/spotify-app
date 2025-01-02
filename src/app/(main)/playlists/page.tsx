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
  TextField,
} from "@mui/material";

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
        public: false,
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
    <div className=" bg-neutral-black-10 w-full">
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
          {playlist.images[0] && (
            <Image
              height={72}
              width={72}
              src={playlist.images[0].url}
              alt={playlist.name}
            />
          )}
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
        <DialogTitle>Dê um nome a sua playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="As Melhores"
            type="text"
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreatePlaylist} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPlaylists;
