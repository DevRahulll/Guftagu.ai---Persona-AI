"use client"

import { AvatarPanel } from "@/components/avatar-panel"
import { useState } from "react"
import { Persona, personas } from "@/lib/personas"
import { ChatPanel } from "@/components/chat-panel"

export default function Page() {
  const [activePersona, setActivePersona] = useState<Persona>(personas[0])
  return (
    <main
      className="bg-bg text-text-primary h-screen overflow-hidden transition-colors duration-500"
      style={{ ["--accent" as string]: activePersona.accent }}
    >
      <section className="mx-auto grid h-[calc(100vh-4rem)] max-w-7xl overflow-hidden lg:grid-cols-2">
        {/* avtar panel left side */}
        <div className="h-full overflow-hidden">
          <AvatarPanel
            activePersona={activePersona}
            onChangePersona={setActivePersona}
          />
        </div>

        {/* chat llm response panel right side */}
        <div className="h-full min-h-0 overflow-hidden">
          <ChatPanel activePersona={activePersona} />
        </div>
      </section>
    </main>
  )
}
