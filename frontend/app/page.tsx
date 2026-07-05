"use client"

import { AvatarPanel } from "@/components/avatar-panel"
import { useState } from "react"
import { Persona, personas } from "@/lib/personas"
import { ChatPanel } from "@/components/chat-panel"

export default function Page() {
  const [activePersona, setActivePersona] = useState<Persona>(personas[0])
  return (
    <main
      className="bg-bg text-text-primary min-h-screen transition-colors duration-300"
      style={{ ["--accent" as string]: activePersona }}
    >
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">
        {/* avtar panel left side */}
        <AvatarPanel
          activePersona={activePersona}
          onChangePersona={setActivePersona}
        />
        {/* chat llm response panel right side */}
        <ChatPanel activePersona={activePersona} />
      </section>
    </main>
  )
}
