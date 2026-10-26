import { useState } from "react";
import { ratingService } from "../services/rating.service";

export function useRating(conversationId) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submitRating = async (score, comment) => {
    setIsLoading(true);
    setError(null);
    try {
      await ratingService.submitRating(conversationId, { score, comment });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitRating, isLoading, error, submitted };
}
