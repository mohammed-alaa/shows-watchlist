import { eq, and } from "drizzle-orm";

export async function byId(id: TShow["id"]): Promise<TShow | undefined> {
	const drizzle = useDrizzle();

	const show = await drizzle
		.select()
		.from(showsTable)
		.where(eq(showsTable.id, id))
		.limit(1);

	if (!show.length) {
		return undefined;
	}

	return show.at(0)!;
}

export async function byImdbId(imdbId: TShow["imdbId"]) {
	const drizzle = useDrizzle();

	const show = await drizzle
		.select()
		.from(showsTable)
		.where(eq(showsTable.imdbId, imdbId))
		.limit(1);

	return show.at(0);
}

export async function byTmdbId(
	tmdbId: TShow["tmdbId"],
): Promise<TShow | undefined> {
	const drizzle = useDrizzle();

	const show = await drizzle
		.select()
		.from(showsTable)
		.where(eq(showsTable.tmdbId, tmdbId))
		.limit(1);

	return show.at(0);
}

export async function byTmdbIdWithAddedLists(
	tmdbId: TShow["tmdbId"],
	userId: TUser["id"],
): Promise<TShowListWithLists | undefined> {
	const drizzle = useDrizzle();

	const showDb = await drizzle
		.select()
		.from(showsTable)
		.leftJoin(
			showsListsTable,
			and(
				eq(showsListsTable.showId, showsTable.id),
				eq(showsListsTable.userId, userId),
			),
		)
		.where(eq(showsTable.tmdbId, tmdbId));

	if (showDb.length) {
		const lists = showDb
			.map((list) => list.shows_lists)
			.filter((list) => list !== null);
		const show = {
			...showDb[0].shows,
			lists,
		};

		return show;
	}
}
