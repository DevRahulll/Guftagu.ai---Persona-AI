"use client"

import { cn } from "@/lib/utils"
import { Persona, personas } from "@/lib/personas"

type Props = {
  activeId: string
  onChange: (personas: Persona) => void
}

export function PersonaToggle({ activeId, onChange }: Props) {
  return (
    <div className="">
      {personas.map((persona) => {
        const isActive = persona.id === activeId
        return <button key={persona.id}>{persona.name}</button>
      })}
    </div>
  )
}
