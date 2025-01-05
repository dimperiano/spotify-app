"use client"

import { useEffect, useRef } from "react"

export const useInfiniteScroll = (
  callback: () => void,
  hasNextPage: boolean,
) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        const [firstEntry] = entries
        if (firstEntry.isIntersecting) {
          callback()
        }
      },
      { threshold: 0 },
    )

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [hasNextPage, callback])

  return lastElementRef
}
