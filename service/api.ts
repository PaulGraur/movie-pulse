import axios from "axios";

const API_KEY = "a4e0e6c94492c515df52f4a6ebcc54c7";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const params = {
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
};

export const fetchMovieDetails = async (movieId: number) => {
  const response = await axios.get(`/movie/${movieId}`, params);
  return response.data;
};

export const handleSearch = async (movieName: string) => {
  const response = await axios.get(`/search/movie?query=${movieName}`, params);
  return response.data.results;
};

export const fetchMovieCast = async (movieId: number) => {
  const response = await axios.get(`movie/${movieId}/credits?`, params);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId: number) => {
  const response = await axios.get(`movie/${movieId}/reviews?`, params);
  return response.data.results;
};
