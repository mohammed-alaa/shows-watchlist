import { pgTable, integer, varchar, index, text } from "drizzle-orm/pg-core";

export default pgTable(
	"users",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: varchar({ length: 255 }).notNull(),
		email: varchar({ length: 255 }).notNull(),
		password: text().notNull(),
	},
	(table) => [index("index_email").on(table.email)],
);
