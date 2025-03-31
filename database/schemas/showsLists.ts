import { pgTable, index, integer } from "drizzle-orm/pg-core";
import { usersTable, listsTable, showsTable } from "../tables";

export default pgTable(
	"shows_lists",
	{
		showId: integer()
			.notNull()
			.references(() => showsTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
		listId: integer()
			.notNull()
			.references(() => listsTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
	},
	(table) => [
		index().on(table.showId),
		index().on(table.listId),
		index().on(table.userId),
	],
);
