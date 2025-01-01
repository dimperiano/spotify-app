'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button className='!font-rubik !bg-accent-green-10 !leading-6 w-[113px] hover:opacity-85 h-[42px] !font-semibold !rounded-3xl flex items-center justify-center !text-neutral-black-20' onClick={handleOpen}>
        Sair
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmação de Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja sair? Esta ação irá desconectar você da sua conta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
