import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <Container className="grid min-h-[60vh] place-items-center py-24">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">404</p>
        <h1 className="mt-4 font-display text-5xl text-balance sm:text-6xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[color:var(--color-ink-soft)]">{t("subtitle")}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/">{t("cta")}</Button>
        </div>
      </div>
    </Container>
  );
}
