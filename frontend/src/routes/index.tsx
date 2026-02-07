import { Link, createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const siteUrl = import.meta.env.VITE_SITE_URL || ''

  return (
    <>
      <Helmet>
        <title>{profile.name} — Portfolio</title>
        <meta name="description" content={profile.headline} />
        <link rel="canonical" href={`${siteUrl}/`} />
      </Helmet>

      <section className="mx-auto max-w-3xl text-center py-16 space-y-8">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Glow background */}
            <div className="absolute inset-0 blur-2xl opacity-30 bg-foreground/20 rounded-full" />

            {/* Image */}
            <img
              src="/profile.png"
              alt={`${profile.name} profile`}
              className="
                relative
                h-28 w-28
                md:h-32 md:w-32
                rounded-full
                object-cover
                object-top
                border-4 border-background
                shadow-xl
              "
            />
          </div>
        </motion.div>

        {/* Name + Role */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-semibold">{profile.name}</h1>

          <p className="text-lg text-foreground/70">{profile.role}</p>

          <p className="text-sm md:text-base text-foreground/70 max-w-xl mx-auto">
            {profile.headline}
          </p>
        </motion.div>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <span className="size-2 rounded-full bg-foreground/80" />
            <span>{profile.location}</span>
          </div>
        </motion.div>

        {/* Skills badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {profile.highlights.slice(0, 6).map((h) => (
            <Badge key={h} variant="secondary">
              {h}
            </Badge>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          <Button asChild>
            <Link to="/projects">View Projects</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/contact">Contact</Link>
          </Button>

          <Button variant="secondary" asChild>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>

          <Button variant="secondary" asChild>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
        </motion.div>
      </section>
    </>
  )
}
