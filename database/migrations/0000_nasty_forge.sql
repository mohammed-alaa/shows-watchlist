CREATE TABLE "lists" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lists_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "sessions_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lists_userId_index" ON "lists" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "sessions_session_index" ON "sessions" USING btree ("session");--> statement-breakpoint
CREATE INDEX "sessions_userId_session_index" ON "sessions" USING btree ("userId","session");--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email");