export default async function (
	tmdbId: TShow["tmdbId"],
	imdbId: TShow["imdbId"],
	title: TShow["title"],
	type: TShow["type"],
) {
	const drizzle = useDrizzle();

	return (
		await drizzle
			.insert(showsTable)
			.values({
				imdbId,
				title,
				type,
				tmdbId,
			})
			.returning()
	).at(0)!;
}
