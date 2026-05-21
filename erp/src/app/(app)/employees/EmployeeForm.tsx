"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { createEmployeeAction, type EmployeeFormState } from "./actions";

const INITIAL_STATE: EmployeeFormState = {};

export function EmployeeForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function close() {
    setOpen(false);
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await createEmployeeAction(INITIAL_STATE, formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-4 text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824]"
      >
        <Plus size={15} strokeWidth={2} />
        Добавить сотрудника
      </button>

      <Modal open={open} onClose={close} title="Новый сотрудник">
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
          <Field name="name" label="Имя" autoComplete="given-name" />
          <Field name="surname" label="Фамилия" autoComplete="family-name" />
          <Field name="position" label="Должность" placeholder="Например, Senior Engineer" />
          <Field name="login" label="Логин" autoComplete="off" />
          <Field name="password" label="Пароль" type="password" autoComplete="new-password" />

          {error && (
            <p className="rounded-lg bg-[color:var(--color-rose-100)] px-3 py-2 text-xs text-[color:var(--color-rose-500)]">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="h-10 rounded-full border border-[color:var(--color-line-strong)] px-5 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={pending}
              className="h-10 rounded-full bg-[color:var(--color-ink)] px-5 text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824] disabled:opacity-60"
            >
              {pending ? "Сохраняем..." : "Сохранить"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const optional = name === "position";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={!optional}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="input-surface h-10 rounded-xl border border-[color:var(--color-line)] px-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] focus:border-[color:var(--color-ink)]"
      />
    </label>
  );
}
