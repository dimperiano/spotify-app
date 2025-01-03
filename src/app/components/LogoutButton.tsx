"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button
        className="!font-rubik !bg-accent-green-10 !leading-6 w-[113px] hover:opacity-85 h-[42px] !font-semibold !rounded-3xl flex items-center justify-center !text-neutral-black-20"
        onClick={handleOpen}
      >
        Sair
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Tem certeza de que deseja sair?
          <IconButton
          className="text-3xl !text-neutral-white-0"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 6,
              top: 6,
              color: (theme) => theme.palette.common.white,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você será desconectado da sua conta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            className="!rounded-3xl !font-semibold !mx-auto"
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
