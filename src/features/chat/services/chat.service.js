import apiClient from "../../../lib/apiClient";

export const chatService = {
  getConversations: () => apiClient.get("/conversations").then((res) => res.data),
  getOrCreateConversation: (tutorId) =>
    apiClient.post("/conversations", { tutorId }).then((res) => res.data),
  getMessages: (conversationId) =>
    apiClient.get(`/conversations/${conversationId}/messages`).then((res) => res.data),
  sendTextMessage: (conversationId, text) =>
    apiClient.post(`/conversations/${conversationId}/messages`, { type: "TEXT", textContent: text }).then((res) => res.data),
  sendFileMessage: (conversationId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient
      .post(`/conversations/${conversationId}/messages/file`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
};
