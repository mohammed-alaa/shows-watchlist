DROP INDEX "shows_imdbId_index";--> statement-breakpoint
ALTER TABLE "shows" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shows" ADD COLUMN "tmdbId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_type_unique" UNIQUE("type");--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_tmdbId_unique" UNIQUE("tmdbId");