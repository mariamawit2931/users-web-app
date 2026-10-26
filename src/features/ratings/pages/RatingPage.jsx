import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRating } from "../hooks/useRating";
import Button from "../../../components/common/Button";
import ErrorMessage from "../../../components/common/ErrorMessage";

// Expects a route like /conversations/:conversationId/rate
export default function RatingPage() {
  const { conversationId } = useParams();
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");
  const { submitRating, isLoading, error, submitted } = useRating(conversationId);

  if (submitted) {
    return <p className="text-center mt-10">Thanks for your feedback!</p>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Rate this tutor</h1>
      <select className="w-full border rounded-md px-3 py-2 mb-3" value={score} onChange={(e) => setScore(Number(e.target.value))}>
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
        ))}
      </select>
      <textarea
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Optional comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <ErrorMessage message={error} />
      <Button onClick={() => submitRating(score, comment)} disabled={isLoading}>
        Submit rating
      </Button>
    </div>
  );
}
