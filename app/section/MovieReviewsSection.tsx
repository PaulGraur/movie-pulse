"use client";

import React, { FC, useEffect, useState } from "react";
import { fetchMovieReviews } from "@/service/api";

interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}

interface Props {
  movieId: number;
}

const MovieReviewsSection: FC<Props> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  if (loading) return <p className="text-center py-4">Loading reviews...</p>;

  if (reviews.length === 0)
    return <p className="text-center py-4 text-gray-400">No reviews found.</p>;

  return (
    <section className="container">
      <div className="mx-auto p-[40px] bg-[#fff] rounded-[32px]">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-800 p-4 rounded shadow hover:bg-zinc-700 transition"
            >
              <p className="text-sm italic mb-2">By: {review.author}</p>
              <p className="text-gray-300 mb-2 line-clamp-5">
                {review.content}
              </p>
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Read full review
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieReviewsSection;
