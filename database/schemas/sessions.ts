import { pgTable, integer, index, text } from "drizzle-orm/pg-core";
import { usersTable } from "../tables";

export default pgTable(
	"sessions",
	{
		sessionId: text().primaryKey().notNull(),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, {
				onDelete: "cascade",
				onUpdate: "no action",
			}),
	},
	(table) => [
		index("index_user_id").on(table.userId),
		index("index_session_id").on(table.sessionId),
		index("index_user_id_session_id").on(table.userId, table.sessionId),
	],
);
