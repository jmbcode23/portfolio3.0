import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { profile } from '../data/profile'
import { ModeToggle } from '@/components/mode-toggle'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteNavbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight">
          Jonathan<span className="text-foreground/60">.dev</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => {
            const active = pathname === item.to
            return (
              <Button
                key={item.to}
                variant={active ? 'secondary' : 'ghost'}
                asChild
              >
                <Link to={item.to}>{item.label}</Link>
              </Button>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <Button variant="outline" asChild>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="outline" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
