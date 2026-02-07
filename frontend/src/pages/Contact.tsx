import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profile } from '../data/profile'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { useContact } from '@/hooks/useContact'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long'),
  email: z.string().email('Please enter a valid email'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const siteUrl = import.meta.env.VITE_SITE_URL || ''
  const contactMutation = useContact()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onChange',
  })

  async function onSubmit(values: ContactFormValues) {
    try {
      await contactMutation.mutateAsync(values)

      // Reset only if request succeeded
      form.reset()
    } catch (error) {
      // No toast here — mutation already handles error toast
      console.error('Contact form submission failed:', error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — {profile.name}</title>
        <meta
          name="description"
          content={`Contact ${profile.name} for frontend work, collaborations, or tutoring.`}
        />
        <link rel="canonical" href={`${siteUrl}/contact`} />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-foreground/70 max-w-2xl">
            Send a message for collaboration, frontend work, or tutoring.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">Send a message</h3>
                    <p className="text-sm text-foreground/70">
                      Form is ready — we’ll connect the backend later.
                    </p>
                  </div>
                  <Badge variant="secondary">Design only</Badge>
                </div>

                <Separator />

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <fieldset disabled={contactMutation.isPending}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="you@email.com"
                                  type="email"
                                  autoComplete="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What is this about?"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Example: “Frontend role”, “Project collaboration”,
                              “Tutoring”
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me what you’re building…"
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <Button
                          type="submit"
                          disabled={contactMutation.isPending}
                        >
                          {contactMutation.isPending
                            ? 'Sending...'
                            : 'Send Message'}
                        </Button>

                        <div className="ml-auto flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-4"
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">Social</h3>
                <p className="text-sm text-foreground/70">
                  Quick ways to reach me.
                </p>
                <div className="flex flex-col gap-2 pt-1">
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
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">What to include</h3>
                <ul className="text-sm text-foreground/70 list-disc pl-5 space-y-1">
                  <li>Your goal + timeline</li>
                  <li>Links / references (optional)</li>
                  <li>Your budget range (optional)</li>
                  <li>Preferred communication channel</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
