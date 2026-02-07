import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function ProjectsPage() {
  const siteUrl = import.meta.env.VITE_SITE_URL || ''

  return (
    <>
      <Helmet>
        <title>Projects — {profile.name}</title>
        <meta
          name="description"
          content="Selected projects across verification, fintech, and workflow platforms."
        />
        <link rel="canonical" href={`${siteUrl}/projects`} />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-semibold">Projects</h2>
          <p className="text-foreground/70 max-w-2xl">
            A selection of products I’ve worked on — spanning verification
            systems, corporate banking workflows, and travel budgeting
            platforms.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {profile.projects.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <Card className="rounded-2xl overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-foreground/70">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {(p.links.live || p.links.repo) && (
                    <div className="flex gap-2 pt-1">
                      {p.links.live ? (
                        <Button asChild variant="outline">
                          <a
                            href={p.links.live}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        </Button>
                      ) : null}
                      {p.links.repo ? (
                        <Button asChild variant="secondary">
                          <a
                            href={p.links.repo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Code
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border p-6 bg-foreground/5"
        >
          <h4 className="font-semibold">Note</h4>
          <p className="text-sm text-foreground/70 mt-1">
            Some projects are still in progress, and private work may not have
            public repos or demos.
          </p>
        </motion.div>
      </div>
    </>
  )
}
