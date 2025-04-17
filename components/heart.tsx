"use client"

import { useState } from "react"
import { HeartIcon } from "lucide-react"

export function Heart() {
  const [liked, setLiked] = useState(false)

  return (
    <button
      className="flex items-center justify-center"
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <HeartIcon
        className={`h-5 w-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
    </button>
  )
}
