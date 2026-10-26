import { useState } from "react";
import { quizService } from "../services/quiz.service";

export function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedOptionId }
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async (subjectId, gradeLevel) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await quizService.getQuestions({ subjectId, gradeLevel });
      setQuestions(data);
      setAnswers({});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const submitQuiz = async (subjectId, gradeLevel) => {
    setIsLoading(true);
    try {
      const payload = {
        subjectId,
        gradeLevel,
        answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
          questionId,
          selectedOptionId,
        })),
      };
      const data = await quizService.submitAttempt(payload);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    } finally {
      setIsLoading(false);
    }
  };

  return { questions, answers, result, isLoading, error, startQuiz, selectAnswer, submitQuiz };
}
