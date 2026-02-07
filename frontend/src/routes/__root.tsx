import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SeoDefaults } from '@/shared/seo/SeoDefaults'
import { SiteNavbar } from '@/shared/SiteNavbar'
import { SiteFooter } from '@/shared/SiteFooter'
import { ThemeProvider } from '@/components/theme-provider'

export const Route = createRootRoute({
  component: () => (
    <>
      <SeoDefaults />
      <ScrollRestoration />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-dvh bg-background text-foreground">
          <SiteNavbar />
          <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-20">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </ThemeProvider>
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  ),
})
