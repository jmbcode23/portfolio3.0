import { Helmet } from 'react-helmet-async'
import { profile } from '@/data/profile'

export function SeoDefaults() {
  const siteUrl = import.meta.env.VITE_SITE_URL || ''
  const ogImage = `${siteUrl}/og.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    url: siteUrl,
    sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <meta name="description" content={profile.headline} />
      <meta property="og:site_name" content={`${profile.name} Portfolio`} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
