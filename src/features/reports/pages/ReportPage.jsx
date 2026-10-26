import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReport } from "../hooks/useReport";
import Button from "../../../components/common/Button";
import ErrorMessage from "../../../components/common/ErrorMessage";

// Expects /report?targetType=MESSAGE&targetId=xyz
export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const targetType = searchParams.get("targetType");
  const targetId = searchParams.get("targetId");
  const [reason, setReason] = useState("");
  const { submitReport, isLoading, error, submitted } = useReport();

  if (submitted) {
    return <p className="text-center mt-10">Report submitted. An admin will review it.</p>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Report content</h1>
      <textarea
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="What's wrong?"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <ErrorMessage message={error} />
      <Button onClick={() => submitReport(targetType, targetId, reason)} disabled={isLoading || !reason}>
        Submit report
      </Button>
    </div>
  );
}
