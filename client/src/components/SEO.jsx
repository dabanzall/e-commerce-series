import { Helmet } from 'react-helmet-async'

function SEO({ title, description, image }) {
  const siteName = 'ShopZone'
  const defaultDescription = 'Discover thousands of products at unbeatable prices. From electronics to fashion — we have it all.'
  const defaultImage = 'https://ik.imagekit.io/yourname/shopzone/og-image.jpg'

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  )
}

export default SEO