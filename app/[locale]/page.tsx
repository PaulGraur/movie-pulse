"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { fetchMovieDetails } from "@/service/api";

interface HomeProps {
  locale: string;
  selectedMovieId: number | null;
}

export default function Home({ locale, selectedMovieId }: HomeProps) {
  const t = useTranslations("notice");
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
        {t("noMovieSelected")}
      </div>
    );
  }

  return <div className="container mx-auto p-8 pb-20"></div>;
}
