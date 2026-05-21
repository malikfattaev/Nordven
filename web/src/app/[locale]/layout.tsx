import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { publicEnv } from "@/lib/env";

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

  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: publicEnv.NEXT_PUBLIC_SITE_URL,
      siteName: "Nordven",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
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
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
