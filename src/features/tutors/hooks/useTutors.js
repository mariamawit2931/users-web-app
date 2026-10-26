import { useState, useEffect, useCallback } from "react";
import { tutorService } from "../services/tutor.service";

export function useTutors(initialFilters = {}) {
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTutors = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tutorService.getTutors(filters);
      setTutors(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tutors");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  return { tutors, filters, setFilters, isLoading, error };
}
