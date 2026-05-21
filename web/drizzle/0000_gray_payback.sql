CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(240) NOT NULL,
	"company" varchar(160),
	"service_interest" varchar(32),
	"message" text NOT NULL,
	"locale" varchar(8) NOT NULL,
	"source" varchar(64) DEFAULT 'website' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
