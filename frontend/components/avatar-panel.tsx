"use client"

import { useState } from "react"
import { Persona } from "@/lib/personas"
import { PersonaToggle } from "./persona-toggle"
import Image from "next/image"

type Props = {
  activePersona: Persona
  onChangePersona: (persona: Persona) => void
}

export function AvatarPanel({ activePersona, onChangePersona }: Props) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-8 border-b border-border/60 px-8 py-16 lg:border-r lg:border-b-0">
      {/* persona toggle */}
      <PersonaToggle activeId={activePersona.id} onChange={onChangePersona} />

      {/* Avartar  */}
      <div
        className="relative flex h-48 items-center justify-center rounded-full transition-all duration-300"
        style={{
          boxShadow: `0 0 0 2px ${activePersona.accent}55, 0 0 60px ${activePersona.accent}33`,
        }}
      >
        <div className="bg-surface flex h-44 w-44 items-center justify-center overflow-hidden rounded-full">
          {!imgError ? (
            <Image
              src={activePersona.avatarSrc}
              alt={activePersona.name}
              width={176}
              height={176}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span
              className="font-display text-4xl"
              style={{ color: activePersona.accent }}
            >
              {activePersona.initials}
            </span>
          )}
        </div>
      </div>

      {/* name+tagline */}
      <div className="space-y-1 text-center">
        <h2 className="font-display text-text-primary text-2xl">
          {activePersona.name}
        </h2>
        <p className="text-text-muted font-mono text-sm">
          {activePersona.tagline}
        </p>
      </div>
    </div>
  )
}
