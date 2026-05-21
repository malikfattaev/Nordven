"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next ?? "/"} />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
          Login
        </span>
        <input
          name="login"
          autoComplete="username"
          required
          className="input-surface h-11 rounded-xl border border-[color:var(--color-line)] px-4 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] focus:border-[color:var(--color-ink)]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input-surface h-11 rounded-xl border border-[color:var(--color-line)] px-4 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] focus:border-[color:var(--color-ink)]"
        />
      </label>

      {state.error && (
        <p className="rounded-lg bg-[color:var(--color-rose-100)] px-3 py-2 text-xs text-[color:var(--color-rose-500)]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-11 rounded-full bg-[color:var(--color-ink)] text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824] disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
