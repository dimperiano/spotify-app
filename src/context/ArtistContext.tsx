import React, { createContext, useContext, useEffect, useState } from "react"

interface ArtistContextProps {
  artistName: string
  artistImage: string
  setArtist: (name: string, image: string) => void
}

const ArtistContext = createContext<ArtistContextProps | undefined>(undefined)

interface ArtistProviderProps {
  children: React.ReactNode
}

export const ArtistProvider: React.FC<ArtistProviderProps> = ({ children }) => {
  const [artistName, setArtistName] = useState(() => {
    return localStorage.getItem("artistName") || ""
  })
  const [artistImage, setArtistImage] = useState(() => {
    return localStorage.getItem("artistImage") || ""
  })

  const setArtist = (name: string, image: string) => {
    setArtistName(name)
    setArtistImage(image)
    localStorage.setItem("artistName", name)
    localStorage.setItem("artistImage", image)
  }

  useEffect(() => {
    localStorage.setItem("artistName", artistName)
    localStorage.setItem("artistImage", artistImage)
  }, [artistName, artistImage])

  return (
    <ArtistContext.Provider value={{ artistName, artistImage, setArtist }}>
      {children}
    </ArtistContext.Provider>
  )
}

export const useArtist = () => {
  const context = useContext(ArtistContext)
  if (!context) {
    throw new Error("useArtist must be used within an ArtistProvider")
  }
  return context
}