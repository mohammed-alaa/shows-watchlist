export default async function (
	userId: TUser["id"],
	listId: TList["id"],
	showId: TShow["id"],
): Promise<TShowList> {
	const drizzle = useDrizzle();

	const showList = await drizzle
		.insert(showsListsTable)
		.values({
			userId,
			listId,
			showId,
		})
		.returning();

	return showList.at(0)!;
}
