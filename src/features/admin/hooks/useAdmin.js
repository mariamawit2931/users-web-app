import { useState, useEffect, useCallback } from "react";
import { adminService } from "../services/admin.service";

export function useAdmin() {
  const [applications, setApplications] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [apps, reps] = await Promise.all([
        adminService.getPendingApplications(),
        adminService.getOpenReports(),
      ]);
      setApplications(apps);
      setReports(reps);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const approveApplication = async (id) => {
    await adminService.approveApplication(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const rejectApplication = async (id, reason) => {
    await adminService.rejectApplication(id, reason);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const resolveReport = async (id, status) => {
    await adminService.resolveReport(id, status);
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return { applications, reports, isLoading, error, approveApplication, rejectApplication, resolveReport };
}
