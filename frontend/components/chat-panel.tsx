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

const STORAGE_KEY = "persona-chat-history"

type HistoryMap = Record<string, Message[]>

function loadHistoryFromStorage(): HistoryMap {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (error) {
    return {}
  }
}

export function ChatPanel({ activePersona }: Props) {
  const [historyMap, setHistoryMap] = useState<HistoryMap>({})
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  //load saved conversation once, on mount
  useEffect(() => {
    setHistoryMap(loadHistoryFromStorage())
  }, [])

  useEffect(() => {
    if (Object.keys(historyMap).length === 0) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(historyMap))
  }, [historyMap])

  const messages = historyMap[activePersona.id] ?? []

  async function handleSend() {
    const text = input.trim()

    if (!text || loading) return

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ]
    setHistoryMap((prev) => ({ ...prev, [activePersona.id]: nextMessages }))
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: nextMessages,
            personaId: activePersona.id,
          }),
        }
      )

      if (!res.ok) throw new Error("Request failed")

      const data = await res.json()
      const replyText =
        typeof data.reply === "string"
          ? data.reply
          : "Got an unexpected response. Check the backend"

      setHistoryMap((prev) => ({
        ...prev,
        [activePersona.id]: [
          ...nextMessages,
          { role: "assistant", content: replyText },
        ],
      }))
    } catch (error) {
      setHistoryMap((prev) => ({
        ...prev,
        [activePersona.id]: [
          ...nextMessages,
          { role: "assistant", content: "Something went wrong. Try again" },
        ],
      }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, loading])

  const tag = activePersona.id.toUpperCase()

  return (
    <div className="flex h-full min-h-0 flex-col px-6 py-8">
      {/* msg list */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1"
      >
        {messages.length === 0 && (
          <p className="font-mono text-sm text-muted">
            [SYSTEM]: Ask {activePersona.name} anything
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className="mb-1 block font-mono text-xs"
              style={{
                color:
                  m.role === "assistant" ? activePersona.accent : undefined,
              }}
            >
              {m.role === "user" ? "[YOU]" : `[${tag}_AI]`}
            </span>
            <p
              className={
                m.role === "user"
                  ? "bg-surface text-text-primary inline-block max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2"
                  : "text-text-primary inline-block max-w-[85%] rounded-2xl rounded-tl-sm border border-border/60 bg-transparent px-4 py-2"
              }
            >
              {m.content}
            </p>
          </div>
        ))}

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
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Message ${activePersona.name}...`}
          className="bg-surface border-border/60"
        />

        <Button
          onClick={handleSend}
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
