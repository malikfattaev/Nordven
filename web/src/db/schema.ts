import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 240 }).notNull(),
  company: varchar("company", { length: 160 }),
  serviceInterest: varchar("service_interest", { length: 32 }),
  message: text("message").notNull(),
  locale: varchar("locale", { length: 8 }).notNull(),
  source: varchar("source", { length: 64 }).default("website").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
