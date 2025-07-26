// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

// Le composant SEO centralise toutes les balises <head> utiles pour le référencement, le partage et l’affichage pro
const SEO = ({
  title,           // <== Titre de la page (à PERSONNALISER pour chaque page)
  description,     // <== Description unique de la page (à PERSONNALISER)
  image,           // <== URL absolue de l’image à partager sur réseaux sociaux (PEUT ÊTRE la même ou différente selon la page)
  keywords,        // <== Tableau de mots clés principaux pour la page (à PERSONNALISER, ou laisser générique)
  url,             // <== URL absolue de la page (à PERSONNALISER)
  type = "website",// <== Type OpenGraph (website, article, product, etc.)
  siteName = "Cauris Investment", // <== Nom de ton site/projet (en général, tu peux laisser comme ça)
  twitterHandle = "@caurisinvest",// <== Twitter handle, à mettre si tu as un compte (sinon tu modifies)
  children         // <== Permet d’ajouter d’autres balises meta si besoin sur certaines pages
}) => (
  <Helmet>
    {/* --- MÉTAS CLASSIQUES --- */}
    <title>{title}</title>  {/* <= Titre de la page affiché dans l’onglet et dans Google */}
    <meta name="description" content={description} /> {/* <= Description Google */}
    {keywords && <meta name="keywords" content={keywords.join(", ")} />} {/* <= Tableau de mots clés (optionnel) */}
    <meta name="author" content="Cauris Investment" /> {/* <= Auteur global */}
    <meta name="copyright" content="Cauris Investment 2025" />
    <meta name="robots" content="index, follow" /> {/* <= Autorise l’indexation Google */}

    {/* --- OPEN GRAPH pour Facebook/LinkedIn --- */}
    <meta property="og:type" content={type} />                 {/* <= Type de contenu */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}   {/* <= Image affichée lors du partage */}
    {url && <meta property="og:url" content={url} />}         {/* <= URL de la page */}
    <meta property="og:site_name" content={siteName} />

    {/* --- TWITTER CARD --- */}
    <meta name="twitter:card" content="summary_large_image" /> {/* <= Format de carte Twitter */}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
    <meta name="twitter:site" content={twitterHandle} />

    {/* --- FAVICON et ICONES APP --- */}
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

    {/* --- PWA Manifest (à utiliser si ton site est une PWA) --- */}
    <link rel="manifest" href="/manifest.json" />

    {/* --- LANGUE DU DOCUMENT --- */}
    <html lang="fr" />

    {/* --- SCHEMA.ORG STRUCTURE DATA --- */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteName,
        "url": url,
        "logo": image,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+224 624 138 395", // <= Numéro de contact principal, PERSONNALISE
            "contactType": "customer service",
            "areaServed": "GN"               // <= GN = Guinée. Modifie si international.
          }
        ],
        "sameAs": [
          "https://www.facebook.com/caurisinvestment", // <= Met tes liens officiels
          "https://www.linkedin.com/company/caurisinvestment"
        ]
      })}
    </script>
    {/* --- AUTRES BALISES au besoin via la prop children --- */}
    {children}
  </Helmet>
);

export default SEO;
