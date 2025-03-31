CREATE TABLE "shows" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shows_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"imdbId" text NOT NULL,
	CONSTRAINT "shows_imdbId_unique" UNIQUE("imdbId")
);
--> statement-breakpoint
CREATE TABLE "shows_lists" (
	"showId" integer NOT NULL,
	"listId" integer NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shows_lists" ADD CONSTRAINT "shows_lists_showId_shows_id_fk" FOREIGN KEY ("showId") REFERENCES "public"."shows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows_lists" ADD CONSTRAINT "shows_lists_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows_lists" ADD CONSTRAINT "shows_lists_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "shows_lists_showId_index" ON "shows_lists" USING btree ("showId");--> statement-breakpoint
CREATE INDEX "shows_lists_listId_index" ON "shows_lists" USING btree ("listId");--> statement-breakpoint
CREATE INDEX "shows_lists_userId_index" ON "shows_lists" USING btree ("userId");