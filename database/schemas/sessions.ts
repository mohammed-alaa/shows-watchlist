import { pgTable, integer, index, text } from "drizzle-orm/pg-core";
import { usersTable } from "../tables";

export default pgTable(
	"sessions",
	{
		session: text().primaryKey().notNull(),
		userId: integer()
			.unique()
			.notNull()
			.references(() => usersTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
	},
	(table) => [
		index().on(table.session),
		index().on(table.userId, table.session),
	],
);
