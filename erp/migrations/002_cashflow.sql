CREATE TABLE IF NOT EXISTS cashflow_accounts (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  currency   text NOT NULL CHECK (currency IN ('UZS', 'USD')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cashflow_operations (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type           text NOT NULL CHECK (type IN ('income', 'expense', 'profit', 'profit_expense')),
  amount         numeric(14, 2) NOT NULL CHECK (amount > 0),
  account_id     text NOT NULL REFERENCES cashflow_accounts(id),
  description    text NOT NULL DEFAULT '',
  operation_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cashflow_operations_account_idx ON cashflow_operations (account_id);
CREATE INDEX IF NOT EXISTS cashflow_operations_date_idx ON cashflow_operations (operation_date DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS cashflow_operations_type_idx ON cashflow_operations (type);

INSERT INTO cashflow_accounts (id, name, currency, sort_order)
VALUES
  ('settlement_uzs', 'Settlement account UZS', 'UZS', 10),
  ('settlement_usd', 'Settlement account USD', 'USD', 20),
  ('corporate_card', 'Corporate card', 'UZS', 30)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    currency = EXCLUDED.currency,
    sort_order = EXCLUDED.sort_order;
