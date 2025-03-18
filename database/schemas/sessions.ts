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
		index("index_session_token").on(table.session),
		index("index_user_id_session_token").on(table.userId, table.session),
	],
);
