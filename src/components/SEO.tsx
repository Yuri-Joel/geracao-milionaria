import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }: { title: string; description: string }) {
  const defaultTitle = "AGM | Ligamos Talentos a Oportunidades em Angola";
  const defaultDescription =
    "A AGM conecta talentos angolanos a oportunidades reais. Apoie através de doações e transforme vidas.";

  return (
    <Helmet>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "AGM",
          "description": "Organização que liga talentos a oportunidades em Angola, capacitando jovens e promovendo desenvolvimento profissional.",
          "url": "https://www.agmi.ao",
          "logo": "%PUBLIC_URL%/favicon.ico",
          "sameAs": [
            "https://www.facebook.com/p/Gera%C3%A7%C3%A3o-Milion%C3%A1ria-AGM-100082512764759/",
    
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Luanda",
            "addressCountry": "AO"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+244 923 806 943",
            "contactType": "customer service",
            "email": "geral@geracao-milionaria.com"
          }
        }
        `}
      </script>
      <title>{title ? `${title} | AGM` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
    </Helmet>
  );
}