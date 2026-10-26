import apiClient from "../../../lib/apiClient";

export const tutorService = {
  getTutors: (filters = {}) => apiClient.get("/tutors", { params: filters }).then((res) => res.data),
  getTutorById: (tutorId) => apiClient.get(`/tutors/${tutorId}`).then((res) => res.data),
};
