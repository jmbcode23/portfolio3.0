import { Link } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'

export default function AboutPage() {
  const siteUrl = import.meta.env.VITE_SITE_URL || ''

  const skills = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Redux Toolkit',
    'TanStack Query',
    'TanStack Router',
    'JWT Auth',
    'RBAC',
    'Node/Express (still learning)',
  ]

  const timeline = [
    {
      title: 'Frontend React Developer (Fintech)',
      period: 'Current',
      description:
        'Building and maintaining production React features with clean UI, reliable auth flows, and scalable architecture patterns.',
    },
    {
      title: 'Verification Platform Work — Qiniso',
      period: 'Recent',
      description:
        'Worked on verification-focused product flows (quick verifications, form workspaces, and report experiences) with modern UI patterns.',
    },
    {
      title: 'Projects in progress',
      period: 'Ongoing',
      description:
        'CIB (Corporate Internet Banking), a ride-sharing web app, and a government travel & budget platform.',
    },
  ]

  return (
    <>
      <Helmet>
        <title>About — {profile.name}</title>
        <meta
          name="description"
          content={`About ${profile.name}: React + TypeScript developer with fintech and verification product experience.`}
        />
        <link rel="canonical" href={`${siteUrl}/about`} />
      </Helmet>

      <div className="space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-semibold">About</h2>
          <p className="text-foreground/70 max-w-3xl">
            I’m {profile.name}, a frontend React developer who builds clean,
            reliable, and visually polished web applications. I focus on strong
            UX, maintainable codebases, and scalable patterns (auth, RBAC,
            routing, data fetching).
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">What I do</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  I build React apps with TypeScript using component-driven
                  design, thoughtful UX, and robust state/data patterns. I’ve
                  worked on products in verification and fintech-like
                  environments, where correctness and user trust matter. I also
                  tutor frontend development and French.
                </p>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Currently working on</h4>
                  <ul className="text-sm text-foreground/70 list-disc pl-5 space-y-1">
                    <li>
                      CIB (Corporate Internet Banking): transfers, payments,
                      transactions, airtime.
                    </li>
                    <li>
                      Ride-sharing web app experience (maps + real-time flows).
                    </li>
                    <li>
                      Government travel & budget platform for official travel
                      planning.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button asChild>
                    <Link to="/projects">See projects</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Core skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Links</h4>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </Button>
                    <Button variant="secondary" asChild>
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold">Timeline</h3>

          <div className="grid gap-3">
            {timeline.map((t) => (
              <Card key={t.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-sm text-foreground/70">
                        {t.description}
                      </p>
                    </div>
                    <Badge variant="secondary">{t.period}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border p-6 bg-foreground/5"
        >
          <h4 className="font-semibold">Open to opportunities</h4>
          <p className="text-sm text-foreground/70 mt-1 max-w-3xl">
            I’m open to frontend roles and collaborations where I can build
            polished, reliable UI and ship features that users love.
          </p>
        </motion.div>
      </div>
    </>
  )
}
