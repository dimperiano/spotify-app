"use client"

import { useQuery } from "react-query"
import { fetchUserProfile } from "../services/fetchUserProfile"
import { THIRTY_MINUTES_IN_MILLISECONDS } from "@/modules/shared/constants"

const useUserProfile = () => {
  return useQuery("userProfile", fetchUserProfile, {
    staleTime: THIRTY_MINUTES_IN_MILLISECONDS,
    refetchOnWindowFocus: true,
    onError: (error) => {
      console.error("Error fetching user profile:", error)
    },
  })
}

export default useUserProfile
