import { eq, and } from "drizzle-orm";

export default async function (
	userId: TUser["id"],
	listId: TList["id"],
	showId: TShow["id"],
): Promise<TShowList> {
	const drizzle = useDrizzle();

	const entry = await drizzle
		.delete(showsListsTable)
		.where(
			and(
				eq(showsListsTable.userId, userId),
				eq(showsListsTable.listId, listId),
				eq(showsListsTable.showId, showId),
			),
		)
		.returning();

	return entry.at(0)!;
}
