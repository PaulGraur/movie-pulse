"use client";

import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieDetailsSection from "@/app/section/MovieDetailsSection";
import MovieCastSection from "@/app/section/MovieCastSection";
import MovieReviewsSection from "@/app/section/MovieReviewsSection";
import { fetchMovieDetails } from "@/service/api";

const MoviePage: FC = () => {
  const params = useParams();
  const movieId = Number(params.id);

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    fetchMovieDetails(movieId)
      .then((data) => setMovieDetails(data))
      .catch((err) => console.error("Failed to fetch movie details", err))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading)
    return (
      <p className="text-center py-8 text-white">Loading movie details...</p>
    );

  if (!movieDetails)
    return <p className="text-center py-8 text-red-500">Movie not found.</p>;

  return (
    <>
      <MovieDetailsSection movie={movieDetails} />
      <MovieCastSection movieId={movieId} />
      <MovieReviewsSection movieId={movieId} />
    </>
  );
};

export default MoviePage;
