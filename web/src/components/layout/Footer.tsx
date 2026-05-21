import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-canvas)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-pretty text-sm text-[color:var(--color-ink-soft)]">
            {t("tagline")}
          </p>
          <p className="mt-6 text-xs text-[color:var(--color-ink-muted)]">{t("based")}</p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            {t("services")}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.services.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
                >
                  {tServices(`${item.key}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            {t("company")}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.company.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            {t("legal")}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.legal.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-line)]">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-[color:var(--color-ink-muted)] sm:flex-row sm:items-center">
          <span>
            &copy; {year} {site.name}. {t("rights")}
          </span>
          <span className="font-mono uppercase tracking-[0.18em]">{site.name} / Studio</span>
        </div>
      </div>
    </footer>
  );
}
