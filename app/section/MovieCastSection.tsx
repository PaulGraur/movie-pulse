"use client";

import React, { FC, useEffect, useState } from "react";
import { fetchMovieCast } from "@/service/api";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import CastCard from "@/components/cast/CastCard";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Props {
  movieId: number;
}

const MovieCastSection: FC<Props> = ({ movieId }) => {
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const loadCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.slice(0, 20));
      } catch (err) {
        console.error("Failed to load cast", err);
      }
    };

    loadCast();
  }, [movieId]);

  return (
    <section className="container">
      <div className="mx-auto p-[40px] backdrop-blur-lg bg-white/30 border border-white/40 rounded-[32px]">
        <h2 className="text-[32px] text-center mb-[40px]">Cast</h2>

        <Carousel
          withIndicators
          height={560}
          slideSize="20%"
          slideGap="md"
          emblaOptions={{ loop: true, align: "start", slidesToScroll: 3 }}
        >
          {cast.map((actor) => (
            <Carousel.Slide key={actor.id}>
              <CastCard
                name={actor.name}
                character={actor.character}
                profilePath={actor.profile_path}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default MovieCastSection;
