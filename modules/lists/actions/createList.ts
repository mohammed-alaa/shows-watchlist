export async function createList(
	name: string,
	userId: number,
	isWatchList: boolean = false,
): Promise<TList> {
	const drizzle = useDrizzle();
	return (
		await drizzle
			.insert(listsTable)
			.values({
				name,
				userId,
				isWatchList,
			})
			.returning()
	).at(0)!;
}

export async function createWatchList(userId: number): Promise<TList> {
	return createList("Watch List", userId, true);
}
