"use client";

import {
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { CalendarDays, CreditCard, Landmark, Pencil, Plus, Trash2, WalletCards } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import {
  createCashflowOperationAction,
  deleteCashflowOperationAction,
  updateCashflowOperationAction,
  type CashflowActionState,
} from "./actions";

export type CashflowAccount = {
  id: string;
  name: string;
  currency: "UZS" | "USD";
  sort_order: number;
};

export type CashflowOperationType = "income" | "expense" | "profit" | "profit_expense";

export type CashflowOperation = {
  id: string;
  type: CashflowOperationType;
  amount: number;
  account_id: string;
  account_name: string;
  currency: "UZS" | "USD";
  description: string;
  operation_date: string;
};

type AccountMetric = CashflowAccount & {
  balance: number;
  operations: number;
};

type DialogState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; operation: CashflowOperation };

const INITIAL_STATE: CashflowActionState = {};

const TYPE_OPTIONS: Array<{ value: CashflowOperationType; label: string; tone: string }> = [
  { value: "income", label: "Income", tone: "mint" },
  { value: "expense", label: "Expense", tone: "peach" },
  { value: "profit", label: "Profit", tone: "mist" },
  { value: "profit_expense", label: "Expense from profit", tone: "lilac" },
];

const TONE_CLASSES: Record<string, { surface: string; text: string }> = {
  mist: {
    surface: "bg-[color:var(--color-mist-100)]",
    text: "text-[color:var(--color-mist-500)]",
  },
  mint: {
    surface: "bg-[color:var(--color-mint-100)]",
    text: "text-[color:var(--color-mint-500)]",
  },
  peach: {
    surface: "bg-[color:var(--color-peach-100)]",
    text: "text-[color:var(--color-peach-500)]",
  },
  lilac: {
    surface: "bg-[color:var(--color-lilac-100)]",
    text: "text-[color:var(--color-lilac-500)]",
  },
};

const ACCOUNT_ICONS: Record<string, typeof Landmark> = {
  settlement_uzs: Landmark,
  settlement_usd: WalletCards,
  corporate_card: CreditCard,
};

const SIGN: Record<CashflowOperationType, 1 | -1> = {
  income: 1,
  expense: -1,
  profit: 1,
  profit_expense: -1,
};

function formatMoney(amount: number, currency: "UZS" | "USD") {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  }
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)} UZS`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function typeLabel(type: CashflowOperationType) {
  return TYPE_OPTIONS.find((item) => item.value === type)?.label ?? type;
}

function typeTone(type: CashflowOperationType) {
  return TYPE_OPTIONS.find((item) => item.value === type)?.tone ?? "mist";
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function CashflowClient({
  accounts,
  operations,
}: {
  accounts: CashflowAccount[];
  operations: CashflowOperation[];
}) {
  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });
  const close = () => setDialog({ mode: "closed" });

  const accountMetrics = useMemo<AccountMetric[]>(() => {
    return accounts.map((account) => {
      const related = operations.filter((operation) => operation.account_id === account.id);
      const balance = related.reduce((sum, operation) => sum + operation.amount * SIGN[operation.type], 0);
      return { ...account, balance, operations: related.length };
    });
  }, [accounts, operations]);

  const totals = useMemo(() => {
    const byCurrency = {
      UZS: { income: 0, expense: 0, profit: 0, balance: 0 },
      USD: { income: 0, expense: 0, profit: 0, balance: 0 },
    };

    for (const operation of operations) {
      const bucket = byCurrency[operation.currency];
      const signed = operation.amount * SIGN[operation.type];
      bucket.balance += signed;
      if (operation.type === "income") bucket.income += operation.amount;
      if (operation.type === "expense") bucket.expense += operation.amount;
      if (operation.type === "profit") bucket.profit += operation.amount;
      if (operation.type === "profit_expense") {
        bucket.expense += operation.amount;
        bucket.profit -= operation.amount;
      }
    }

    return byCurrency;
  }, [operations]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--color-line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(243,246,251,0.78)_48%,rgba(251,244,238,0.88))] p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[color:var(--color-mist-200)]/55 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-16 h-72 w-72 rounded-full bg-[color:var(--color-mint-200)]/45 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">Cashflow</h1>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--color-ink-soft)]">
              <span>Income {formatMoney(totals.UZS.income, "UZS")}</span>
              <span>Expense {formatMoney(totals.UZS.expense, "UZS")}</span>
              <span>Profit {formatMoney(totals.UZS.profit, "UZS")}</span>
              <span>Balance {formatMoney(totals.UZS.balance, "UZS")}</span>
              <span>USD balance {formatMoney(totals.USD.balance, "USD")}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-[color:var(--color-line)] bg-white/70 px-4 py-2 text-xs text-[color:var(--color-ink-soft)] shadow-[0_1px_12px_rgba(22,21,19,0.04)]">
              No FX conversion
            </div>
            <button
              type="button"
              onClick={() => setDialog({ mode: "create" })}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 text-sm font-medium text-[color:var(--color-canvas)] transition-[background-color,transform] duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:bg-[#2a2824]"
            >
              <Plus size={16} strokeWidth={1.8} />
              Add operation
            </button>
          </div>
        </div>

        <div className="relative mt-7 grid gap-4 lg:grid-cols-3">
          {accountMetrics.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[1.35rem] border border-[color:var(--color-line)] bg-white/76 shadow-[0_1px_20px_rgba(22,21,19,0.045)]">
          <div className="grid grid-cols-12 border-b border-[color:var(--color-line)] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)] max-md:hidden">
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Account</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1" />
          </div>

          {operations.length > 0 ? (
            <div className="divide-y divide-[color:var(--color-line)]">
              {operations.map((operation) => (
                <OperationRow
                  key={operation.id}
                  operation={operation}
                  onEdit={() => setDialog({ mode: "edit", operation })}
                />
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center px-6 py-16 text-center">
              <div>
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-mist-100)] text-[color:var(--color-mist-500)]">
                  <WalletCards size={20} strokeWidth={1.8} />
                </div>
                <h2 className="mt-4 font-display text-2xl text-[color:var(--color-ink)]">No operations yet</h2>
                <p className="mt-2 max-w-sm text-sm text-[color:var(--color-ink-soft)]">
                  Add the first income, expense, profit, or expense-from-profit entry to start tracking cashflow.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CashflowDialog
        open={dialog.mode !== "closed"}
        onClose={close}
        accounts={accounts}
        operation={dialog.mode === "edit" ? dialog.operation : undefined}
      />
    </div>
  );
}

function AccountCard({ account }: { account: AccountMetric }) {
  const Icon = ACCOUNT_ICONS[account.id] ?? Landmark;
  const tone = account.currency === "USD" ? "mist" : account.id === "corporate_card" ? "lilac" : "mint";
  const classes = TONE_CLASSES[tone];

  return (
    <article className="group rounded-[1.35rem] border border-[color:var(--color-line)] bg-white/72 p-5 shadow-[0_1px_18px_rgba(22,21,19,0.04)] transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-[color:var(--color-line-strong)] hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${classes.surface} ${classes.text}`}>
            <Icon size={17} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-sm text-[color:var(--color-ink-soft)]">{account.name}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              {account.currency}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7 font-display text-3xl text-[color:var(--color-ink)]">
        {formatMoney(account.balance, account.currency)}
      </div>
      <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
        {account.operations} {account.operations === 1 ? "operation" : "operations"}
      </p>
    </article>
  );
}

function OperationRow({
  operation,
  onEdit,
}: {
  operation: CashflowOperation;
  onEdit: () => void;
}) {
  const signed = operation.amount * SIGN[operation.type];
  const tone = typeTone(operation.type);
  const classes = TONE_CLASSES[tone];

  return (
    <div className="grid grid-cols-1 gap-3 px-5 py-4 text-sm md:grid-cols-12 md:items-center md:gap-0">
      <div className="md:col-span-2">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${classes.surface} ${classes.text}`}>
          {typeLabel(operation.type)}
        </span>
      </div>
      <div className={`font-medium md:col-span-2 ${signed < 0 ? "text-[color:var(--color-peach-500)]" : "text-[color:var(--color-ink)]"}`}>
        {signed < 0 ? "-" : "+"}{formatMoney(operation.amount, operation.currency)}
      </div>
      <div className="md:col-span-2">
        <span className="inline-flex rounded-full border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas)]/60 px-3 py-1 text-xs text-[color:var(--color-ink-soft)]">
          {operation.account_name}
        </span>
      </div>
      <div className="text-[color:var(--color-ink-soft)] md:col-span-4">
        {operation.description || "—"}
      </div>
      <div className="flex items-center gap-2 text-[color:var(--color-ink-muted)] md:col-span-1">
        <CalendarDays className="md:hidden" size={14} strokeWidth={1.8} />
        {formatDate(operation.operation_date)}
      </div>
      <div className="flex justify-start gap-2 md:col-span-1 md:justify-end">
        <button
          type="button"
          aria-label="Edit operation"
          onClick={onEdit}
          className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
        >
          <Pencil size={13} strokeWidth={1.75} />
        </button>
        <form action={deleteCashflowOperationAction}>
          <input type="hidden" name="id" value={operation.id} />
          <button
            type="submit"
            aria-label="Delete operation"
            className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-rose-400)] hover:text-[color:var(--color-rose-500)]"
          >
            <Trash2 size={14} strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  );
}

function CashflowDialog({
  open,
  onClose,
  accounts,
  operation,
}: {
  open: boolean;
  onClose: () => void;
  accounts: CashflowAccount[];
  operation?: CashflowOperation;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = Boolean(operation);

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
        ? await updateCashflowOperationAction(INITIAL_STATE, formData)
        : await createCashflowOperationAction(INITIAL_STATE, formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      formRef.current?.reset();
      close();
    });
  }

  return (
    <Modal open={open} onClose={close} title={isEdit ? "Edit operation" : "New operation"}>
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        {operation && <input type="hidden" name="id" value={operation.id} />}

        <Select name="type" label="Operation type" defaultValue={operation?.type ?? ""} required>
          <option value="" disabled>Choose type</option>
          {TYPE_OPTIONS.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </Select>

        <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
          <Field
            name="amount"
            label="Amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            defaultValue={operation?.amount ? String(operation.amount) : ""}
            required
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">Currency</span>
            <div className="input-surface grid h-10 place-items-center rounded-xl border border-[color:var(--color-line)] px-3 text-sm text-[color:var(--color-ink-soft)]">
              by account
            </div>
          </div>
        </div>

        <Select name="accountId" label="Account" defaultValue={operation?.account_id ?? accounts[0]?.id ?? ""} required>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} · {account.currency}
            </option>
          ))}
        </Select>

        <Field
          name="description"
          label="Description"
          placeholder="Investment, supplier payment, salary reserve..."
          defaultValue={operation?.description ?? ""}
        />

        <Field
          name="operationDate"
          label="Date"
          type="date"
          defaultValue={operation?.operation_date ?? today()}
          required
        />

        {error && (
          <p className="rounded-lg bg-[color:var(--color-rose-100)] px-3 py-2 text-xs text-[color:var(--color-rose-500)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-11 rounded-full bg-[color:var(--color-ink)] px-5 text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824] disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save operation"}
        </button>
      </form>
    </Modal>
  );
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  placeholder,
  required = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
        {label}
      </span>
      <input
        {...props}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-surface h-10 rounded-xl border border-[color:var(--color-line)] px-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-ink)]"
      />
    </label>
  );
}

function Select({
  name,
  label,
  defaultValue,
  children,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="input-surface h-10 rounded-xl border border-[color:var(--color-line)] px-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-200 ease-[var(--ease-soft)] focus:border-[color:var(--color-ink)]"
      >
        {children}
      </select>
    </label>
  );
}
