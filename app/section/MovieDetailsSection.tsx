"use client";

import Image from "next/image";
import React, { FC } from "react";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface Props {
  movie: MovieDetails;
  className?: string;
}

const MovieDetailsSection: FC<Props> = ({ movie, className }) => {
  return (
    <section className="container">
      <div className="container mx-auto px-[16px] py-[40px] backdrop-blur-lg bg-white/30 border border-white/40 rounded-[32px]">
        <div className="flex gap-[40px]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={1000}
            height={1500}
            className="rounded-[32px] w-[400px] h-[600px] shadow-[0_0_25px_#00000010]"
          />

          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-[40px] font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-700 mb-4">{movie.overview}</p>
            </div>

            <div className="mt-auto">
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-bold">Rating:</span>{" "}
                {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsSection;
