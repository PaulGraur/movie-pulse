import axios from "axios";

const API_KEY = "a4e0e6c94492c515df52f4a6ebcc54c7";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const baseParams = {
  api_key: API_KEY,
  language: "en-US",
};

const localeToApiLanguageMap: Record<string, string> = {
  ua: "uk-UA",
  de: "de-DE",
  en: "en-US",
};

const getParams = (extraParams = {}) => ({
  params: {
    ...baseParams,
    ...extraParams,
  },
});

export const fetchMovieDetails = async (movieId: number, locale?: string) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/movie/${movieId}`,
    getParams({ language })
  );
  return response.data;
};

export const handleSearch = async (movieName: string, locale?: string) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/search/movie`,
    getParams({ query: movieName, language })
  );
  return response.data.results;
};

export const fetchMovieCast = async (movieId: number, locale?: string) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/movie/${movieId}/credits`,
    getParams({ language })
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId: number, locale?: string) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/movie/${movieId}/reviews`,
    getParams({ language })
  );
  return response.data.results;
};

export const fetchGenres = async (locale?: string) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/genre/movie/list`,
    getParams({ language })
  );
  return response.data.genres;
};

export const fetchUpcomingMovies = async (locale?: string, page = 1) => {
  const language = localeToApiLanguageMap[locale ?? "en"] ?? "en-US";
  const response = await axios.get(
    `/movie/upcoming`,
    getParams({ language, page })
  );
  return response.data.results;
};

interface Filters {
  genreId?: number;
  minRating?: number;
  yearFrom?: number;
  yearTo?: number;
  language?: string;
  sortBy?: string;
  includeAdult?: boolean;
  page?: number;
  locale?: string;
}

export const fetchMoviesByFilters = async (filters: Filters) => {
  const {
    genreId,
    minRating,
    yearFrom,
    yearTo,
    language,
    sortBy = "popularity.desc",
    includeAdult = false,
    page = 1,
    locale,
  } = filters;

  const apiLanguage = locale
    ? localeToApiLanguageMap[locale] ?? "en-US"
    : language ?? "en-US";

  const params: any = {
    with_genres: genreId,
    "vote_average.gte": minRating,
    "primary_release_date.gte": yearFrom ? `${yearFrom}-01-01` : undefined,
    "primary_release_date.lte": yearTo ? `${yearTo}-12-31` : undefined,
    language: apiLanguage,
    sort_by: sortBy,
    include_adult: includeAdult,
    page,
  };

  Object.keys(params).forEach(
    (key) =>
      params[key] === undefined || (params[key] === "" && delete params[key])
  );

  const response = await axios.get(`/discover/movie`, getParams(params));
  return response.data.results;
};
