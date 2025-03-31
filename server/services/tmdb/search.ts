export async function getByTitle(title: string, page: number) {
	const { TMDB_API_KEY } = useRuntimeConfig();
	const endpoint = "https://api.themoviedb.org/3/search/multi";
	const response = await $fetch<TSearchByTitleSuccessfulResponse>(endpoint, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${TMDB_API_KEY}`,
		},
		query: {
			page,
			query: title,
			include_adult: true,
		},
	});

	return Promise.resolve(response);
}

export async function getById<T = TMediaTypes>(id: number, mediaType: T) {
	switch (mediaType) {
		case "movie":
			return getMovieDetails(id);
		case "tv":
			return getShowDetails(id);
		default:
			return Promise.reject(new Error("Invalid media type"));
	}
}

async function getMovieDetails(id: number) {
	const { TMDB_API_KEY } = useRuntimeConfig();
	const details = await $fetch<TShowDetails<"movie">>(
		`https://api.themoviedb.org/3/movie/${id}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${TMDB_API_KEY}`,
			},
			query: {
				append_to_response:
					"images,videos,credits,casts,external_ids,latest,recommendations",
			},
		},
	);

	return Promise.resolve(details);
}

async function getShowDetails(id: number) {
	const { TMDB_API_KEY } = useRuntimeConfig();
	const details = await $fetch<TShowDetails<"tv">>(
		`https://api.themoviedb.org/3/tv/${id}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${TMDB_API_KEY}`,
			},
			query: {
				append_to_response:
					"credits,external_ids,images,videos,latest,recommendations,seasons,imdb_id",
			},
		},
	);

	return Promise.resolve(details);
}
