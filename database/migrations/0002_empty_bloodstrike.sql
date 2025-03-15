CREATE TABLE "sessions" (
	"sessionId" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "index_user_id" ON "sessions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "index_session_id" ON "sessions" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX "index_user_id_session_id" ON "sessions" USING btree ("userId","sessionId");