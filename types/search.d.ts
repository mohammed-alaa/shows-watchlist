interface TSearchPayload {
	search: string;
}

interface TResult {
	Title: string;
	Year: string;
	imdbID: string;
	Poster: string;
}

interface TPagination {
	currentPage: number;
	totalPages: number;
	perPage: number;
	pages: Array<{
		active: boolean;
		number: number;
		baseUrl: URL;
	}>;
}

// interface TSearchResponse {
// 	results: Array<TResult>;
// 	pagination: TPagination;
// }
