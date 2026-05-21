import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-line)]">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <Link
          href="/"
          className="-mx-2 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-[color:var(--color-ink-soft)]"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
          >
            {site.email}
          </a>
        </nav>

        <p className="text-xs text-[color:var(--color-ink-muted)] sm:text-right">
          &copy; {year} {site.name}. {tFooter("rights")}
        </p>
      </div>
    </footer>
  );
}
