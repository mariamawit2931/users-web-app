import apiClient from "../../../lib/apiClient";

export const ratingService = {
  submitRating: (conversationId, payload) =>
    apiClient.post(`/conversations/${conversationId}/rating`, payload).then((res) => res.data),
};
