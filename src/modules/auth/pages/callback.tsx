"use client"

import { CircularProgress } from "@mui/material"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useEffect, Suspense } from "react"

const CallbackPageContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams?.get("code")

  useEffect(() => {
    if (code) {
      fetch(`/api/auth?action=callback&code=${code}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          console.log("Tokens:", data)
          router.push("/home")
        })
        .catch((error) => {
          console.error("Error during authentication:", error)
        })
    }
  }, [code, router])

  return (
    <div className="w-full h-screen flex items-center justify-center gap-4 ">
      <CircularProgress /> <p>Authenticating...</p>
    </div>
  )
}

export const CallbackPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center ">
          <CircularProgress />
        </div>
      }
    >
      <div className="flex items-center justify-center">
        <CallbackPageContent />
      </div>
    </Suspense>
  )
}
