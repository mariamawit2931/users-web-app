import apiClient from "../../../lib/apiClient";

export const adminService = {
  getPendingApplications: () => apiClient.get("/admin/tutor-applications?status=SUBMITTED").then((res) => res.data),
  approveApplication: (applicationId) =>
    apiClient.patch(`/admin/tutor-applications/${applicationId}/approve`).then((res) => res.data),
  rejectApplication: (applicationId, rejectionReason) =>
    apiClient.patch(`/admin/tutor-applications/${applicationId}/reject`, { rejectionReason }).then((res) => res.data),
  getOpenReports: () => apiClient.get("/admin/reports?status=PENDING").then((res) => res.data),
  resolveReport: (reportId, status) =>
    apiClient.patch(`/admin/reports/${reportId}`, { status }).then((res) => res.data),
};
