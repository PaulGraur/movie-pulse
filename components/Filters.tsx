"use client";

import React, { FC } from "react";

interface FiltersProps {
  genres: { id: number; name: string }[];
  selectedGenre: number | null;
  setSelectedGenre: (id: number | null) => void;

  minRating: number;
  setMinRating: (val: number) => void;

  yearFrom: number | null;
  setYearFrom: (val: number | null) => void;

  yearTo: number | null;
  setYearTo: (val: number | null) => void;

  language: string | null;
  setLanguage: (lang: string | null) => void;

  sortBy: string;
  setSortBy: (sort: string) => void;

  includeAdult: boolean;
  setIncludeAdult: (val: boolean) => void;

  onClear: () => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "uk", name: "Ukrainian" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

const sortOptions = [
  { value: "popularity.desc", label: "Popularity ↓" },
  { value: "popularity.asc", label: "Popularity ↑" },
  { value: "vote_average.desc", label: "Rating ↓" },
  { value: "vote_average.asc", label: "Rating ↑" },
  { value: "release_date.desc", label: "Release Date ↓" },
  { value: "release_date.asc", label: "Release Date ↑" },
];

const Filters: FC<FiltersProps> = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  minRating,
  setMinRating,
  yearFrom,
  setYearFrom,
  yearTo,
  setYearTo,
  language,
  setLanguage,
  sortBy,
  setSortBy,
  includeAdult,
  setIncludeAdult,
  onClear,
}) => {
  return (
    <div className="w-full backdrop-blur-lg bg-white/30 border border-white/40 rounded-xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <label className="block mb-1 font-semibold">Genre</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedGenre ?? ""}
          onChange={(e) =>
            setSelectedGenre(e.target.value ? +e.target.value : null)
          }
        >
          <option value="">Any</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Min Rating</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="0-10"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Year From</label>
        <input
          type="number"
          min={1900}
          max={new Date().getFullYear()}
          value={yearFrom ?? ""}
          onChange={(e) => setYearFrom(e.target.value ? +e.target.value : null)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 2000"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Year To</label>
        <input
          type="number"
          min={1900}
          max={new Date().getFullYear()}
          value={yearTo ?? ""}
          onChange={(e) => setYearTo(e.target.value ? +e.target.value : null)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 2023"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Language</label>
        <select
          className="w-full p-2 border rounded"
          value={language ?? ""}
          onChange={(e) => setLanguage(e.target.value || null)}
        >
          <option value="">Any</option>
          {languages.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Sort by</label>
        <select
          className="w-full p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="includeAdult"
          checked={includeAdult}
          onChange={(e) => setIncludeAdult(e.target.checked)}
        />
        <label htmlFor="includeAdult" className="select-none">
          Include Adult (18+)
        </label>
      </div>

      <div className="flex items-end">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-[32px] w-full"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
