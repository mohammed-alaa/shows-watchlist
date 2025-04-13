interface TConfigurationResponse {
	images: {
		base_url: string;
		secure_base_url: string;
		backdrop_sizes: string[];
		logo_sizes: string[];
		poster_sizes: string[];
		profile_sizes: string[];
		still_sizes: string[];
	};
	change_keys: string[];
}

type TMediaTypeTv = "tv";
type TMediaTypeMovie = "movie";
type TMediaTypes = TMediaTypeMovie | TMediaTypeTv;
interface TSpokenLanguage {
	english_name: string;
}

interface TGenre {
	id: number;
	name: string;
}

interface TSeasonDetails {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}

interface TNetwork {
	logo_path: string;
	name: string;
	id: number;
}

interface TVideo {
	id: string;
	key: string;
	name: string;
	site: string;
	size: number;
	type: string;
}

interface TImage {
	aspect_ratio: number;
	file_path: string;
	height: number;
	width: number;
}

interface TTitleCommon {
	adult: boolean;
	genre_ids: number[];
	id: number;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	original_language: string;
	original_country: string[];
	languages: string[];
}

interface TTitleTypeTv extends TTitleCommon {
	media_type: TMediaTypeTv;
	original_name: string;
	first_air_date: string;
}

interface TTitleTypeMovie extends TTitleCommon {
	media_type: TMediaTypeMovie;
	original_title: string;
	release_date: string;
}

type TSearchTitleDataResponse<T = TMediaTypeMovie> = T extends TMediaTypeMovie
	? TTitleTypeMovie
	: TTitleTypeTv;

interface TSearchByTitleSuccessfulResponse<T = TMediaTypes> {
	page: number;
	results: TSearchTitleDataResponse<T>[];
	total_pages: number;
	total_results: number;
}

interface TShowDetailsCommon extends TTitleCommon {
	homepage: string;
	status: string;
	tagline: string | null;
	spoken_languages: TSpokenLanguage[];
	genres: TGenre[];
	images: {
		backdrops: TImage[];
		posters: TImage[];
	};
	videos: {
		results: TVideo[];
	};
	external_ids: {
		imdb_id: string;
	};
}

interface TShowTypeMovieDetails extends TShowDetailsCommon, TTitleTypeMovie {
	runtime: number;
	budget: number;
	imdb_id: string;
	recommendations: TSearchByTitleSuccessfulResponse<TMediaTypeMovie>;
}

interface TShowTypeTvDetails extends TShowDetailsCommon, TTitleTypeTv {
	number_of_episodes: number;
	number_of_seasons: number;
	type: string;
	last_air_date: string;
	last_episode_to_air: {
		air_date: string;
		episode_number: number;
		episode_type: string;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		season_number: number;
		show_id: number;
		still_path: string;
	};
	seasons: TSeasonDetails[];
	networks: TNetwork[];
	recommendations: TSearchByTitleSuccessfulResponse<TMediaTypeTv>;
}

type TShowDetails<T extends TMediaTypes> = T extends TMediaTypeMovie
	? TShowTypeMovieDetails
	: TShowTypeTvDetails;

interface TSearchByImdb {
	tv_results: Array<TShowDetails<"tv">>;
	movie_results: Array<TShowDetails<"movie">>;
}
