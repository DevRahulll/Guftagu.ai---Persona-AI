import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="bg-bg/80 sticky top-2 z-50 w-full border-b border-border/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* logo */}
        <div className="flex items-center gap-2">
          <div className="shadow-[0_0_12px_var(--accent) h-2.5 w-2.5 rounded-full bg-accent transition-colors duration-300" />
          <span className="font-display text-text-primary text-lg tracking-tight">
            GUFTAGU
          </span>
        </div>

        {/* thme toggler */}
        <ThemeToggle />
      </div>
    </header>
  )
}
