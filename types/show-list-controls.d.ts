interface TAddToListControls {
	listId: TList["id"];
	type: TMediaTypes;
	showTmdbId: TShow["tmdbId"];
}

interface TRemoveFromListControls {
	listId: TList["id"];
	showTmdbId: TShow["tmdbId"];
}
