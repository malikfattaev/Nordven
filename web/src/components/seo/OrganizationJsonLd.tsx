import { site } from "@/content/site";
import { serviceSlugs } from "@/content/services";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { htmlLangMap, languageNameMap } from "@/lib/seo";

type Props = {
  locale: Locale;
};

export async function OrganizationJsonLd({ locale }: Props) {
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.name,
        alternateName: site.legalName,
        url: site.url,
        email: site.email,
        foundingDate: String(site.founded),
        sameAs: [site.socials.instagram.url],
        founder: site.founders.map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
        })),
        knowsAbout: [...site.knowsAbout],
        areaServed: site.areaServed.map((code) => ({
          "@type": "Country",
          identifier: code,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          availableLanguage: routing.locales.map((l) => languageNameMap[l]),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: serviceSlugs.map((slug) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: tServices(`${slug}.name`),
              description: tServices(`${slug}.short`),
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.name,
        description: tMeta("description"),
        publisher: { "@id": `${site.url}#organization` },
        inLanguage: routing.locales.map((l) => htmlLangMap[l]),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}#service`,
        name: `${site.name} ${site.tagline}`,
        url: site.url,
        provider: { "@id": `${site.url}#organization` },
        areaServed: site.areaServed.map((code) => ({ "@type": "Country", identifier: code })),
        serviceType: [...site.knowsAbout],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
