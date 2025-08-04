import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  image,
  keywords,
  url,
  type = "website",
  siteName = "CaurisInvestment",
  twitterHandle = "@Caurisinvestment",
  children,
}) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url,
    logo: image,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+224612858507",
        contactType: "customer service",
        areaServed: "GN",
      },
    ],
    sameAs: [
      "https://www.facebook.com/caurisinvestment",
      "https://www.linkedin.com/company/caurisinvestment",
    ],
  };

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CaurisInvestment",
    url: url,
    logo: image,
    description: "Investissement immobilier, structuration de projets…",
    telephone: "+224612858507",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quartier Kipé, Conakry",
      addressLocality: "Conakry-Kipé",
      addressCountry: "GN",
    },
    sameAs: orgSchema.sameAs,
    openingHours: ["Mo‑Fr 09:00‑17:00"],
    priceRange: "GNF",
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="author" content="Diallo Alpha ousmane" />
      <meta name="copyright" content="CaurisInvestment 2025" />
      <meta name="robots" content="index, follow" />
      {/* Open Graph / Twitter */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:site" content={twitterHandle} />
      {/* Favicons */}
      <link rel="icon" type="image/png" href="/img/kori2.png" />
      <link
        rel="apple-touch-icon"
        href="/img/kori2.png"
        sizes="180x180"
      />
      <html lang="fr" />
      {/* JSON‑LD combiné Organisation + LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify([orgSchema, localSchema])}
      </script>

      {children}
    </Helmet>
  );
};

export default SEO;
