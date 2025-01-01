'use client'

import React from 'react'
import useTopItems from '@/hooks/useTopItems'
import Image from 'next/image'
import { Artist } from '@/types'


const TopArtists = () => {
  const { data, isLoading, isError, error } = useTopItems('artists', 'medium_term', 10)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>
  }

  return (
    <div>
      <h2>Top Artistas</h2>
      <ul>
        {
          data?.items.map((artist: Artist) => (
            <li key={artist.id} className='flex gap-2 items-center'>
              <Image className='rounded-full min-w-16 min-h-16 object-contain' src={artist.images[0]?.url} alt={artist.name} height={50} width={50} />
              <span>{artist.name}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TopArtists;