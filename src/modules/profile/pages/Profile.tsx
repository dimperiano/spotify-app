"use client"

import React from "react"
import useUserProfile from "@/modules/profile/hooks/useUserProfile"
import Image from "next/image"
import Placeholder from "@/assets/icons/placeholder.svg"
import { WarningUnauthorizedContent } from "@/modules/shared/components/WarningUnauthorizedContent"
import LogoutButton from "@/modules/profile/components/LogoutButton"
import { CircularProgress } from "@mui/material"

export const Profile = () => {
  const { data, isLoading, error } = useUserProfile()

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  if (error) return <WarningUnauthorizedContent />

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-6 p-8">
      <Image
        className="rounded-full"
        src={data?.images[0]?.url || Placeholder}
        alt={data?.display_name || "User profile picture"}
        width={128}
        height={128}
      />
      <h1 className="text-2xl leading-5 font-medium">{data?.display_name}</h1>
      <LogoutButton />
    </div>
  )
}
