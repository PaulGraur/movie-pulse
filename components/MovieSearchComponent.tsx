"use client";

import React, { FC } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import NoImage from "@/images/NoImage.jpg";

interface MovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface Props {
  results: MovieResult[];
  loading: boolean;
  onSelectMovie?: (movieId: number) => void;
}

const MovieSearchComponent: FC<Props> = ({
  results,
  loading,
  onSelectMovie,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (results.length === 0) {
    return null;
  }

  const castomStyles = "rounded-[12px] w-[60px] h-[80px] object-cover";
  return (
    <div className="flex flex-col gap-[12px]">
      {results.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          onClick={() => onSelectMovie?.(movie.id)}
          className="flex items-center gap-[8px]"
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className={`${castomStyles}`}
            />
          ) : (
            <Image src={NoImage} alt="No Image" className={`${castomStyles}`} />
          )}
          <p className="flex flex-col p-2 text-left text-[#1d1d1d]">
            <span className="font-extrabold text-[18px]">{movie.title}</span>
            <span className="text-[14px]">{movie.release_date}</span>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MovieSearchComponent;
