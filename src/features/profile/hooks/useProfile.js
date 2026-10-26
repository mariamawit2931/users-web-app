import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profile.service";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await profileService.getMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (payload) => {
    const updated = await profileService.updateMyProfile(payload);
    setProfile(updated);
    return updated;
  };

  return { profile, isLoading, error, updateProfile, refetch: fetchProfile };
}
