"use client"

import { useState } from "react"

export default function Page() {
  const [activePersona, setActivePersona] = useState("string")
  return (
    <main
      className="bg-bg text-text-primary min-h-screen transition-colors duration-300"
      style={{ ["--accent" as string]: activePersona }}
    >
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">
        {/* avtar panel left side */}
        {/* chat llm response panel right side */}
      </section>
    </main>
  )
}
