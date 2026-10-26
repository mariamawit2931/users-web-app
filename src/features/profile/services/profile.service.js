import apiClient from "../../../lib/apiClient";

export const profileService = {
  getMyProfile: () => apiClient.get("/users/me").then((res) => res.data),
  updateMyProfile: (payload) => apiClient.patch("/users/me", payload).then((res) => res.data),
};
