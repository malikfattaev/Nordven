import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Process } from "@/components/home/Process";
import { Metrics } from "@/components/home/Metrics";
import { CtaBlock } from "@/components/home/CtaBlock";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesShowcase />
      <Process />
      <Metrics />
      <CtaBlock />
    </>
  );
}
