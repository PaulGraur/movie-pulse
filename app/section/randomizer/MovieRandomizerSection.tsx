"use client";

import React, { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import MovieCard from "@/components/MovieCard";
import { useApi } from "@/hooks/useApi";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;
}

const MovieRandomizerSection = () => {
  const api = useApi();
  const { fetchGenres, fetchMoviesByFilters } = api;

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [yearFrom, setYearFrom] = useState<number | null>(null);
  const [yearTo, setYearTo] = useState<number | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch {
        setError("Failed to load genres");
      }
    })();
  }, [fetchGenres]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesByFilters({
          genreId: selectedGenre ?? undefined,
          minRating: minRating > 0 ? minRating : undefined,
          yearFrom: yearFrom ?? undefined,
          yearTo: yearTo ?? undefined,
          language: language ?? undefined,
          sortBy,
          includeAdult,
        });
        setMovies(data);
        setRandomIndex(null);
        if (data.length === 0) setError("No movies found");
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [
    selectedGenre,
    minRating,
    yearFrom,
    yearTo,
    language,
    sortBy,
    includeAdult,
  ]);

  const handleRandomize = () => {
    if (movies.length === 0) return;
    const idx = Math.floor(Math.random() * movies.length);
    setRandomIndex(idx);
  };

  const handleNext = () => {
    if (movies.length === 0 || randomIndex === null) return;
    setRandomIndex((randomIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    if (movies.length === 0 || randomIndex === null) return;
    setRandomIndex((randomIndex - 1 + movies.length) % movies.length);
  };

  return (
    <section className="container">
      <div className="mx-auto p-[40px] backdrop-blur-lg bg-white/30 border border-white/40 rounded-[32px] flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Movie Randomizer
        </h1>
        <Filters
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          minRating={minRating}
          setMinRating={setMinRating}
          yearFrom={yearFrom}
          setYearFrom={setYearFrom}
          yearTo={yearTo}
          setYearTo={setYearTo}
          language={language}
          setLanguage={setLanguage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          includeAdult={includeAdult}
          setIncludeAdult={setIncludeAdult}
          onClear={() => {
            setSelectedGenre(null);
            setMinRating(0);
            setYearFrom(null);
            setYearTo(null);
            setLanguage(null);
            setSortBy("popularity.desc");
            setIncludeAdult(false);
            setError(null);
            setRandomIndex(null);
          }}
        />
        <div className="mt-6 text-center">
          <button
            onClick={handleRandomize}
            disabled={loading || movies.length === 0}
            className="px-8 py-3 bg-blue-600 text-white rounded-[32px] hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Randomize"}
          </button>

          <p className="mt-2 text-gray-700">
            Found: <strong>{movies.length}</strong> movie
            {movies.length !== 1 ? "s" : ""}
          </p>

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
        {randomIndex !== null && movies[randomIndex] && (
          <MovieCard
            movie={movies[randomIndex]}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </section>
  );
};

export default MovieRandomizerSection;
