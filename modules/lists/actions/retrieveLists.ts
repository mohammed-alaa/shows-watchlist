import { eq } from "drizzle-orm";

export async function byUserId(userId: number): Promise<TList[]> {
	const drizzle = useDrizzle();

	return await drizzle
		.select()
		.from(listsTable)
		.where(eq(listsTable.userId, userId));
}

export async function byId(listId: number): Promise<TList> {
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
