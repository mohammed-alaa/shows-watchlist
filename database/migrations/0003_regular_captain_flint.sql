ALTER TABLE "lists" ADD COLUMN "isWatchList" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "lists_isWatchList_index" ON "lists" USING btree ("isWatchList");