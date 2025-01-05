"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export const CallbackPage = () => {
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
    <div className="flex items-center justify-center">
      <p>Authenticating...</p>
    </div>
  )
}
