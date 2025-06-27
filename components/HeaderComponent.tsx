"use client";

import React, { FC, useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { handleSearch } from "@/service/api";

import MovieSearchSection from "@/components/MovieSearchComponent";
import LanguageChangeComponent from "@/components/LanguageChangeComponent";

import Logo from "@/images/Logo.png";
import Search from "@/images/search.svg";
import Burger from "@/images/burger.svg";

import Modal from "@/components/Modal";
import { useModal } from "@/hooks/useModal";
import { useTranslations } from "next-intl";

interface MovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface HeaderProps {
  locale: string;
}

const HeaderComponent: FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations("header");
  const { isOpen, open, close } = useModal();

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);

  const [recentMovies, setRecentMovies] = useState<MovieResult[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSelectMovie = (movieId: number) => {
    setSelectedMovieId(movieId);

    const selectedMovie =
      results.find((m) => m.id === movieId) ||
      recentMovies.find((m) => m.id === movieId);

    if (selectedMovie) {
      setRecentMovies((prev) => {
        const exists = prev.find((m) => m.id === selectedMovie.id);
        if (exists) return prev;

        const updated = [selectedMovie, ...prev];
        if (updated.length > 3) updated.pop();
        return updated;
      });
    }

    setResults([]);
    setQuery("");
    setShowResultsDropdown(false);
  };

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResultsDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const data = await handleSearch(searchQuery);
      setResults(data);
      setShowResultsDropdown(data.length > 0 || recentMovies.length > 0);
    } catch (error) {
      console.error("Search failed:", error);
      setShowResultsDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (!query.trim()) {
      setResults([]);
      setShowResultsDropdown(recentMovies.length > 0);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      searchMovies(query);
    }, 300);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, recentMovies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowResultsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="lg:container lg:mt-[20px]">
      <div className="px-[20px] py-[16px] backdrop-blur-lg bg-white/30 border border-white/40 shadow-[0_0_25px_#00000025] lg:rounded-[90px] flex justify-between items-center gap-[22px] relative z-50">
        <div className="flex items-center gap-[22px]">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={60}
              height={60}
              className="object-cover"
            />
          </Link>

          <Link href="/randomizer">{t("headerRandomizer")}</Link>
        </div>

        <form onSubmit={onSearch} className="flex gap-4 w-[700px] relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full bg-[#fff] pl-[44px] pr-[16px] py-[10px] rounded-[32px] focus:outline-none shadow-[0_0_25px_#00000025] focus:shadow-[0_0_25px_#00000050] hover:shadow-[0_0_25px_#00000050] transition-shadow duration-300 ease-in-out"
            onFocus={() => {
              if (results.length || recentMovies.length)
                setShowResultsDropdown(true);
            }}
          />
          <button
            type="submit"
            className="absolute left-[10px] top-1/2 -translate-y-1/2"
            aria-label="Search"
          >
            <Image src={Search} alt="Search" width={24} height={24} />
          </button>

          {showResultsDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full p-[12px] left-0 w-[100%] mt-2 max-h-[500px] overflow-auto bg-[#ffffff] shadow-[0_0_25px_#00000075] rounded-[32px] z-50"
            >
              {recentMovies.length > 0 && (
                <>
                  <h3 className="mt-4 mb-2 font-semibold px-4">
                    Recently viewed
                  </h3>
                  <MovieSearchSection
                    results={recentMovies}
                    loading={false}
                    onSelectMovie={handleSelectMovie}
                  />
                </>
              )}

              {results.length > 0 && (
                <>
                  <h3 className="mb-2 font-semibold px-4">Search results</h3>
                  <MovieSearchSection
                    results={results}
                    loading={loading}
                    onSelectMovie={handleSelectMovie}
                  />
                </>
              )}

              {!loading &&
                results.length === 0 &&
                recentMovies.length === 0 && (
                  <p className="p-4 text-center text-gray-500">
                    No results found
                  </p>
                )}
            </div>
          )}
        </form>

        <Modal isOpen={isOpen} onClose={close} animationType="slide">
          <div className="container">
            <div className="flex justify-between items-center mb-[40px] ">
              <LanguageChangeComponent locale={locale} className="xl:hidden" />
            </div>

            <div className="flex flex-col items-center gap-[40px]"></div>
          </div>
        </Modal>

        <div className="flex items-center gap-[24px]">
          <LanguageChangeComponent
            locale={locale}
            className="hidden xl:block"
          />

          <button
            onClick={open}
            aria-label="Open menu"
            className="xl:hidden px-0 hover:bg-transparent bg-[#fff]"
          >
            <Image src={Burger} alt="Burger" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
