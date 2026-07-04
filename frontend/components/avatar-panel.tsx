"use client"

import { useState } from "react"

export function AvatarPanel() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="">
      {/* persona toggle */}
      <div className="relative h-48 rounded-full">
        <div className="h-44 w-44"></div>
      </div>
    </div>
  )
}
