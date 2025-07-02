"use client";

import React, { FC } from "react";
import Image from "next/image";
import NoImage from "@/images/NoImage.jpg";

interface Props {
  name: string;
  character: string;
  profilePath: string | null;
}

const CastCard: FC<Props> = ({ name, character, profilePath }) => {
  const customStyle =
    "object-cover rounded-[32px] w-[340px] h-[400px] mb-[32px]";

  return (
    <div className="text-center backdrop-blur-lg bg-white/30 shadow-cast-card rounded-[32px] px-[8px] pt-[8px] pb-[24px]">
      <div className="">
        {profilePath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w185${profilePath}`}
            alt={name}
            width={1280}
            height={1920}
            className={`${customStyle}`}
          />
        ) : (
          <Image
            src={NoImage}
            alt="No Image"
            width={1280}
            height={1920}
            className={`${customStyle}`}
          />
        )}
      </div>

      <p className="text-[28px] text-obsidian mb-[4px] h-[88px]">{name}</p>
      <p className="text-[14px] text-obsidian">as {character}</p>
    </div>
  );
};

export default CastCard;
