ALTER TABLE "sessions" RENAME COLUMN "sessionId" TO "session";--> statement-breakpoint
DROP INDEX "index_session_id";--> statement-breakpoint
DROP INDEX "index_user_id_session_id";--> statement-breakpoint
CREATE INDEX "index_session_token" ON "sessions" USING btree ("session");--> statement-breakpoint
CREATE INDEX "index_user_id_session_token" ON "sessions" USING btree ("userId","session");