import apiClient from "../../../lib/apiClient";

export const quizService = {
  getQuestions: (params) => apiClient.get("/quiz/questions", { params }).then((res) => res.data),
  submitAttempt: (payload) => apiClient.post("/quiz/attempts", payload).then((res) => res.data),
  getWeakTopics: () => apiClient.get("/quiz/weak-topics").then((res) => res.data),
};
