import { pgTable, integer, varchar, index } from "drizzle-orm/pg-core";

export default pgTable(
	"users",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: varchar({ length: 255 }).notNull(),
		email: varchar({ length: 255 }).notNull(),
	},
	(table) => [index("index_email").on(table.email)],
);
