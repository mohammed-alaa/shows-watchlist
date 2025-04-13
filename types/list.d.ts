interface TList {
	id: number;
	name: string;
	userId: number;
	isWatchList: boolean;
}

interface TCreateListPayload {
	name: string;
}

interface TListWithShows {
	list: TList;
	shows: TShow[];
}
