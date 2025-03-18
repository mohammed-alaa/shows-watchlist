DROP INDEX "index_user_id";--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "unique_index_user_id" UNIQUE("userId");