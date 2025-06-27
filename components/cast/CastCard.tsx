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
    <div className="text-center bg-[#ffffff] shadow-cast-card rounded-[32px]">
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

      <p className="text-[28px] text-[#1d1d1d] mb-[4px]">{name}</p>
      <p className="text-[14px] text-[#1d1d1d]">as {character}</p>
    </div>
  );
};

export default CastCard;
