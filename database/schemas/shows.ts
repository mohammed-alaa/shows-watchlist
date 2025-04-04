import { pgTable, integer, text } from "drizzle-orm/pg-core";

export default pgTable("shows", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	type: text().$type<TMediaTypes>().notNull(),
	imdbId: text().notNull().unique(),
	tmdbId: integer().notNull().unique(),
});
