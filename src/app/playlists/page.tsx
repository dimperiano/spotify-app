'use client'

import React from 'react';
import useUserPlaylists from '@/hooks/useUserPlaylists';
import Image from 'next/image';
import { Playlist } from '@/types';

const UserPlaylists = () => {
  const { data, isLoading, error } = useUserPlaylists();

  if (isLoading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: erro</p>;

  return (
    <div>
      <h1>Your Playlists</h1>
      {data?.items.map((playlist: Playlist) => (
        <div key={playlist.id} className='flex items-center gap-4'>
            {playlist.images[0] && <Image height={50} width={50} src={playlist.images[0].url} alt={playlist.name} />}
          <div>
          <h2>{playlist.name}</h2>
          
          <p>{!!playlist.description ? playlist.description : 'Sem etiqueta' }</p>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default UserPlaylists;