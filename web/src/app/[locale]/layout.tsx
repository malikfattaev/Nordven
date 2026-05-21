import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { publicEnv } from "@/lib/env";
import { htmlLangMap, ogLocaleMap, pathForLocale } from "@/lib/seo";
import { site } from "@/content/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonical = pathForLocale(locale, routing.defaultLocale, "/");
  const alternateLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => ogLocaleMap[l]);

  const languages: Record<string, string> = {
    "x-default": pathForLocale(routing.defaultLocale, routing.defaultLocale, "/"),
  };
  for (const l of routing.locales) {
    languages[htmlLangMap[l]] = pathForLocale(l, routing.defaultLocale, "/");
  }

  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    applicationName: site.name,
    authors: site.founders.map((f) => ({ name: f.name })),
    creator: site.legalName,
    publisher: site.legalName,
    category: "Software Development",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      url: canonical,
      locale: ogLocaleMap[locale],
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: `@${site.socials.instagram.handle}`,
    },
    alternates: {
      canonical,
      languages,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={htmlLangMap[locale as Locale]}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <div aria-hidden className="page-backdrop" />
        <OrganizationJsonLd locale={locale as Locale} />
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
