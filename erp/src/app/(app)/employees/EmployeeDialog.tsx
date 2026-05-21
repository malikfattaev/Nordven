"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  createEmployeeAction,
  updateEmployeeAction,
  type EmployeeFormState,
} from "./actions";

const INITIAL_STATE: EmployeeFormState = {};

export type EditableEmployee = {
  id: string;
  login: string;
  name: string;
  surname: string;
  position: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  employee?: EditableEmployee;
};

export function EmployeeDialog({ open, onClose, employee }: Props) {
  const isEdit = Boolean(employee);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function close() {
    setError(null);
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateEmployeeAction(INITIAL_STATE, formData)
        : await createEmployeeAction(INITIAL_STATE, formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      formRef.current?.reset();
      close();
    });
  }

  return (
    <Modal open={open} onClose={close} title={isEdit ? "Edit employee" : "New employee"}>
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        {employee && <input type="hidden" name="id" value={employee.id} />}

        <Field name="name" label="First name" autoComplete="given-name" defaultValue={employee?.name} />
        <Field name="surname" label="Last name" autoComplete="family-name" defaultValue={employee?.surname} />
        <Field
          name="position"
          label="Position"
          placeholder="e.g. Senior Engineer"
          defaultValue={employee?.position}
          optional
        />
        <Field name="login" label="Login" autoComplete="off" defaultValue={employee?.login} />
        <Field
          name="password"
          label={isEdit ? "New password" : "Password"}
          type="password"
          autoComplete="new-password"
          placeholder={isEdit ? "Leave empty to keep current" : undefined}
          optional={isEdit}
        />

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
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="h-10 rounded-full bg-[color:var(--color-ink)] px-5 text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824] disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  optional = false,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  optional?: boolean;
}) {
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
        defaultValue={defaultValue}
        className="input-surface h-10 rounded-xl border border-[color:var(--color-line)] px-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] focus:border-[color:var(--color-ink)]"
      />
    </label>
  );
}
