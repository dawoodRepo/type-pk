import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://type-pk.com'

const WEB_APP_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TypePK',
  url: BASE_URL,
  description: 'Free ETEA typing test practice platform for Pakistani government job seekers.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  audience: { '@type': 'Audience', audienceType: 'Pakistani government job seekers' },
})

const WEBSITE_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TypePK',
  url: BASE_URL,
  description: 'Free ETEA typing test practice for Pakistani government job seekers.',
  inLanguage: 'en-PK',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
})

const ORG_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TypePK',
  url: BASE_URL,
  description: 'Free ETEA typing test practice platform for Pakistani government job seekers.',
  contactPoint: { '@type': 'ContactPoint', email: 'hello@type-pk.com', contactType: 'customer support' },
})

interface SEOProps {
  title: string
  description: string
  canonical?: string
  type?: 'website' | 'article'
  articleDate?: string
}

const SEO = ({ title, description, canonical, type = 'website', articleDate }: SEOProps) => {
  const fullTitle = `${title} | TypePK`
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL

  const articleSchema = type === 'article' ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: articleDate || '2026-06-01',
    dateModified: articleDate || '2026-06-01',
    author: { '@type': 'Organization', name: 'TypePK', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'TypePK', url: BASE_URL },
    inLanguage: 'en-PK',
  }) : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="keywords" content="ETEA typing test, typing test Pakistan, WPM test Pakistan, clerk typing practice, junior clerk typing test, PPSC typing test, NTS typing test, typing speed test Urdu, government job typing test KPK" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="TypePK" />
      <meta property="og:locale" content="en_PK" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK-KP" />
      <meta name="geo.country" content="Pakistan" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />

      <script type="application/ld+json">{WEBSITE_JSON}</script>
      <script type="application/ld+json">{WEB_APP_JSON}</script>
      <script type="application/ld+json">{ORG_JSON}</script>
      {articleSchema && <script type="application/ld+json">{articleSchema}</script>}
    </Helmet>
  )
}

export default SEO
