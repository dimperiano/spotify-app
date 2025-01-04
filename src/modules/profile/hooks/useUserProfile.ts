"use client"

import { useQuery } from "react-query"
import { fetchUserProfile } from "../services/fetchUserProfile"

const useUserProfile = () => {
  return useQuery("userProfile", fetchUserProfile, {
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching user profile:", error)
    },
  })
}

export default useUserProfile
