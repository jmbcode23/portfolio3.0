export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/70">
        <p>© {new Date().getFullYear()} Jonathan. Built with React + Vite.</p>
      </div>
    </footer>
  )
}
