"use client";

import React, { FC } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;
  trailerUrl?: string;
}

interface MovieCardProps {
  movie: Movie | null;
  onNext: () => void;
  onPrev: () => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onNext, onPrev }) => {
  if (!movie) return null;

  return (
    <div className="mt-6 p-6 rounded-lg shadow-lg backdrop-blur-lg bg-white/30 border border-white/40 flex flex-col md:flex-row gap-6 items-center w-full">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md max-w-[200px]"
        />
      ) : (
        <div className="w-[200px] h-[300px] bg-gray-300 flex items-center justify-center text-gray-600">
          No Image
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="mt-1 text-gray-600">
          Release Date: {movie.release_date || "N/A"}
        </p>
        <p className="mt-1 text-yellow-600 font-semibold">
          Rating: {movie.vote_average.toFixed(1)}
        </p>
        {movie.overview && (
          <p className="mt-3 text-gray-700 max-h-[150px] overflow-auto">
            {movie.overview}
          </p>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-600 text-snow rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
