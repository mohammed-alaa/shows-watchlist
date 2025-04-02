import { pgTable, integer, text, index } from "drizzle-orm/pg-core";

export default pgTable(
	"shows",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		imdbId: text().notNull().unique().unique(),
	},
	(table) => [index().on(table.imdbId)],
);
