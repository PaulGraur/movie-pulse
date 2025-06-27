"use client";

import { useLocale } from "@/hooks/useLocale";
import * as api from "@/service/api";

export function useApi() {
  const locale = useLocale();

  return {
    fetchMovieDetails: (id: number) => api.fetchMovieDetails(id, locale),
    handleSearch: (query: string) => api.handleSearch(query, locale),
    fetchMovieCast: (id: number) => api.fetchMovieCast(id, locale),
    fetchMovieReviews: (id: number) => api.fetchMovieReviews(id, locale),
    fetchGenres: () => api.fetchGenres(locale),
    fetchMoviesByFilters: (filters: any) => api.fetchMoviesByFilters({ ...filters, locale }),
  };
}
