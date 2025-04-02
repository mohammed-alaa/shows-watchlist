import { pgTable, index, integer, text, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "../tables";

export default pgTable(
	"lists",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: text().notNull(),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
		isWatchList: boolean().notNull().default(false),
	},
	(table) => [index().on(table.userId), index().on(table.isWatchList)],
);
