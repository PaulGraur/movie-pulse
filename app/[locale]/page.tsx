"use client";

import React, { useState, useEffect } from "react";
import MovieDetailsSection from "@/app/section/MovieDetailsSection";
import MovieCastSection from "@/app/section/MovieCastSection";
import MovieReviewsSection from "@/app/section/MovieReviewsSection";
import { fetchMovieDetails } from "@/service/api";

interface HomeProps {
  locale: string;
  selectedMovieId: number | null;
}

export default function Home({ locale, selectedMovieId }: HomeProps) {
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    if (selectedMovieId) {
      fetchMovieDetails(selectedMovieId)
        .then(setMovieDetails)
        .catch((err) => console.error("Failed to fetch movie details", err));
    } else {
      setMovieDetails(null);
    }
  }, [selectedMovieId]);

  if (!selectedMovieId) {
    return (
      <div className="container mx-auto p-8 pb-20 text-center text-gray-400">
        Please select a movie to see details.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pb-20">
      {movieDetails && (
        <>
          <MovieDetailsSection movie={movieDetails} />
          <MovieCastSection movieId={selectedMovieId} />
          <MovieReviewsSection movieId={selectedMovieId} />
        </>
      )}
    </div>
  );
}
