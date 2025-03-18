ALTER TABLE "sessions" DROP CONSTRAINT "unique_index_user_id";--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_unique" UNIQUE("userId");