"use client"

import { useEffect, useRef, useState } from "react"
import { Persona } from "@/lib/personas"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Props = {
  activePersona: Persona
}

export function ChatPanel({ activePersona }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, loading])

  const tag = activePersona.id.toUpperCase()

  return (
    <div className="flex h-150 flex-col px-6 py-8 lg:h-full">
      {/* msg list */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="font-mono text-sm text-muted">
            [SYSTEM]: Ask {activePersona.name} anything
          </p>
        )}

        {}

        {loading && (
          <p className="text-text-muted font-mono text-xs">
            [{tag}_AI]: typing...
          </p>
        )}
      </div>

      {/* input row here*/}
      <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && alert("Hello")}
          placeholder={`Message ${activePersona.name}...`}
          className="bg-surface border-border/60"
        />

        <Button
          onClick={() => alert("Sending")}
          disabled={loading || !input.trim()}
          style={{ backgroundColor: activePersona.accent }}
          className="shrink-0 text-white hover:opacity-90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
