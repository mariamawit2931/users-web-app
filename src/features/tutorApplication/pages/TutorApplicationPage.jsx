import { useState } from "react";
import { useTutorApplication } from "../hooks/useTutorApplication";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function TutorApplicationPage() {
  const { application, isLoading, error, submitApplication, uploadDocument } = useTutorApplication();
  const [form, setForm] = useState({
    educationLevel: "HIGH_SCHOOL",
    institutionName: "",
    bio: "",
  });

  if (isLoading) return <Loader label="Loading application status..." />;

  // Already applied — show status instead of the form.
  if (application) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-xl font-semibold mb-2">Tutor Application</h1>
        <p>Status: <strong>{application.status}</strong></p>
        {application.status === "REJECTED" && (
          <p className="text-sm text-red-600 mt-2">Reason: {application.rejectionReason}</p>
        )}
        {application.status === "APPROVED" && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Upload supporting documents:</p>
            <input
              type="file"
              onChange={(e) => e.target.files[0] && uploadDocument(e.target.files[0], "TRANSCRIPT")}
            />
          </div>
        )}
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitApplication(form);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Apply to become a tutor</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="w-full border rounded-md px-3 py-2"
          value={form.educationLevel}
          onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
        >
          <option value="HIGH_SCHOOL">High school</option>
          <option value="UNIVERSITY">University</option>
        </select>
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Institution name"
          value={form.institutionName}
          onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
        />
        <textarea
          className="w-full border rounded-md px-3 py-2"
          placeholder="Short bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <ErrorMessage message={error} />
        <Button type="submit">Submit application</Button>
      </form>
    </div>
  );
}
