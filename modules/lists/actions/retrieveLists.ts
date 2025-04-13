import { eq, and, getTableColumns } from "drizzle-orm";

export async function byUserId(userId: TUser["id"]): Promise<TList[]> {
	const drizzle = useDrizzle();

	return await drizzle
		.select()
		.from(listsTable)
		.where(eq(listsTable.userId, userId));
}

export async function byId(listId: TList["id"]): Promise<TList> {
	const drizzle = useDrizzle();

	const results = await drizzle
		.select()
		.from(listsTable)
		.where(eq(listsTable.id, listId))
		.limit(1);

	if (results.length === 0) {
		return Promise.reject();
	}

	return Promise.resolve(results[0]);
}

export async function byIdWithShows(
	listId: TList["id"],
	userId: TUser["id"],
): Promise<TListWithShows> {
	const drizzle = useDrizzle();

	const results = await drizzle
		.select({
			...getTableColumns(listsTable),
			shows: showsTable,
		})
		.from(listsTable)
		.leftJoin(showsListsTable, eq(showsListsTable.listId, listsTable.id))
		.leftJoin(showsTable, eq(showsTable.id, showsListsTable.showId))
		.where(and(eq(listsTable.id, listId), eq(listsTable.userId, userId)));

	if (results.length === 0) {
		return Promise.reject();
	}

	const { shows: _shows, ...rest } = results[0];

	const shows = results
		.map((list) => list.shows)
		.filter((list) => list !== null);

	return Promise.resolve({
		list: rest,
		shows: shows,
	});
}
