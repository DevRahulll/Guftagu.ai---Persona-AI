"use client"

import { cn } from "@/lib/utils"
import { Persona, personas } from "@/lib/personas"

type Props = {
  activeId: string
  onChange: (personas: Persona) => void
}

export function PersonaToggle({ activeId, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Choose persona"
      className="bg-surface inline-flex items-center gap-1 rounded-full border border-border/60 p-1"
    >
      {personas.map((persona) => {
        const isActive = persona.id === activeId
        return (
          <button
            key={persona.id}
            aria-selected={isActive}
            className={cn(
              "rounded-full px-4 py-1.5 font-mono text-sm tracking-tight transition-all duration-300",
              isActive
                ? "text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            )}
            onClick={() => onChange(persona)}
            style={{
              backgroundColor: isActive ? persona.accent : "transparent",
            }}
          >
            {persona.name}
          </button>
        )
      })}
    </div>
  )
}
