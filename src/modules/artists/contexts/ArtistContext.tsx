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
  const [artistName, setArtistName] = useState<string>("")
  const [artistImage, setArtistImage] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedArtistName = localStorage.getItem("artistName") || ""
      const storedArtistImage = localStorage.getItem("artistImage") || ""
      setArtistName(storedArtistName)
      setArtistImage(storedArtistImage)
    }
  }, [])

  const setArtist = (name: string, image: string) => {
    setArtistName(name)
    setArtistImage(image)
    if (typeof window !== "undefined") {
      localStorage.setItem("artistName", name)
      localStorage.setItem("artistImage", image)
    }
  }

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
