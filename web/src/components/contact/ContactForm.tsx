"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { serviceSlugs } from "@/content/services";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClasses = cn(
  "block w-full rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)] px-4 py-3 text-sm text-[color:var(--color-ink)] shadow-none transition-all duration-300 ease-[var(--ease-soft)] placeholder:text-[color:var(--color-ink-muted)]",
  "focus:outline-none focus:border-[color:var(--color-ink)] focus:ring-2 focus:ring-[color:var(--color-mist-200)]",
);

const labelClasses = "text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tServices = useTranslations("services");
  const locale = useLocale();

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const clientSchema = z.object({
    name: z.string().min(2, t("validation.nameTooShort")),
    email: z.string().email(t("validation.emailInvalid")),
    company: z.string().optional(),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, t("validation.messageTooShort")),
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim() || undefined,
      serviceInterest: String(formData.get("serviceInterest") ?? "") || undefined,
      message: String(formData.get("message") ?? "").trim(),
    };

    const parsed = clientSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0];
        if (path === "name" || path === "email" || path === "message") {
          next[path] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, locale }),
      });
      if (!response.ok) {
        setStatus("error");
        setServerError(t("error"));
        return;
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setServerError(t("error"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[color:var(--color-mint-200)] bg-[color:var(--color-mint-50)] p-8 text-[color:var(--color-mint-500)]">
        <p className="font-display text-2xl">{t("success")}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={t("name")}
          name="name"
          placeholder={t("namePlaceholder")}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Field
          label={t("email")}
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          error={errors.email}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={t("company")}
          name="company"
          placeholder={t("companyPlaceholder")}
          autoComplete="organization"
        />
        <div className="grid gap-2">
          <label htmlFor="serviceInterest" className={labelClasses}>
            {t("service")}
          </label>
          <select id="serviceInterest" name="serviceInterest" defaultValue="" className={fieldClasses}>
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {tServices(`${slug}.name`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          rows={6}
          className={cn(fieldClasses, "resize-none")}
          required
        />
        {errors.message && <p className="text-xs text-[color:var(--color-peach-500)]">{errors.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-2xl border border-[color:var(--color-peach-200)] bg-[color:var(--color-peach-50)] p-4 text-sm text-[color:var(--color-peach-500)]">
          {serverError}
        </p>
      )}

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function Field({ label, error, name, id, ...rest }: FieldProps) {
  const fieldId = id ?? name;
  return (
    <div className="grid gap-2">
      <label htmlFor={fieldId} className={labelClasses}>
        {label}
      </label>
      <input id={fieldId} name={name} className={fieldClasses} {...rest} />
      {error && <p className="text-xs text-[color:var(--color-peach-500)]">{error}</p>}
    </div>
  );
}
