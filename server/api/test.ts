import { useDrizzle, usersTable } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
	const query = useDrizzle();

	const users = await query.select().from(usersTable);

	return {
		Hello: "World",
		users,
	};
});
