"use client"

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

  return <p>Authenticating...</p>
}

export const CallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center">
        <CallbackPageContent />
      </div>
    </Suspense>
  )
}
