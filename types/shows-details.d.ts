interface TShowList {
	showId: TShow["id"];
	listId: TList["id"];
	userId: TUser["id"];
}

interface TShowListWithLists extends TShow {
	lists: TShowList[];
}

interface TRetrieveShowDetailsResponse {
	details: TShowDetails<TMediaTypes>;
	show: TShowListWithLists | undefined;
}
