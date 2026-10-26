import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

// Expects a route like /quiz/:subjectId/:gradeLevel
export default function QuizPage() {
  const { subjectId, gradeLevel } = useParams();
  const { questions, answers, result, isLoading, error, startQuiz, selectAnswer, submitQuiz } = useQuiz();

  useEffect(() => {
    startQuiz(subjectId, gradeLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, gradeLevel]);

  if (isLoading) return <Loader label="Loading quiz..." />;

  if (result) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-xl font-semibold">Score: {result.score}%</h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <ErrorMessage message={error} />
      {questions.map((q, i) => (
        <div key={q.id} className="border rounded-md p-4">
          <p className="font-medium mb-2">{i + 1}. {q.questionText}</p>
          {q.options.map((opt) => (
            <label key={opt.id} className="block text-sm">
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === opt.id}
                onChange={() => selectAnswer(q.id, opt.id)}
                className="mr-2"
              />
              {opt.optionText}
            </label>
          ))}
        </div>
      ))}
      {questions.length > 0 && (
        <Button onClick={() => submitQuiz(subjectId, gradeLevel)}>Submit quiz</Button>
      )}
    </div>
  );
}
