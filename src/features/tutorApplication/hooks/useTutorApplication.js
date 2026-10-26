import { useState, useEffect, useCallback } from "react";
import { tutorApplicationService } from "../services/tutorApplication.service";

export function useTutorApplication() {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplication = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tutorApplicationService.getMyApplication();
      setApplication(data);
    } catch (err) {
      // 404 just means "no application yet" — not a real error for this screen
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || "Failed to load application status");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const submitApplication = async (payload) => {
    const created = await tutorApplicationService.submitApplication(payload);
    setApplication(created);
    return created;
  };

  const uploadDocument = async (file, documentType) => {
    if (!application) throw new Error("Submit the application before uploading documents");
    return tutorApplicationService.uploadDocument(application.id, file, documentType);
  };

  return { application, isLoading, error, submitApplication, uploadDocument, refetch: fetchApplication };
}
