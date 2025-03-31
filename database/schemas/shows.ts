import { pgTable, integer, text } from "drizzle-orm/pg-core";

export default pgTable(
	"shows",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		imdbId: text().notNull().unique().unique(),
	},
	(table) => [],
);
