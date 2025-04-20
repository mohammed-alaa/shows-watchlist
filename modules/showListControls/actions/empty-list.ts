import { eq, and } from "drizzle-orm";

export default async function (
	userId: TUser["id"],
	listId: TList["id"],
): Promise<void> {
	const drizzle = useDrizzle();

	await drizzle
		.delete(showsListsTable)
		.where(
			and(
				eq(showsListsTable.userId, userId),
				eq(showsListsTable.listId, listId),
			),
		);
	return Promise.resolve();
}
