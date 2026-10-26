import { Link } from "react-router-dom";
import { useTutors } from "../hooks/useTutors";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function TutorDirectoryPage() {
  const { tutors, isLoading, error } = useTutors();

  if (isLoading) return <Loader label="Loading tutors..." />;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Find a tutor</h1>
      <ErrorMessage message={error} />
      <ul className="space-y-3">
        {tutors.map((tutor) => (
          <li key={tutor.userId} className="border rounded-md p-3">
            <p className="font-medium">{tutor.user?.fullName}</p>
            <p className="text-sm text-gray-500">{tutor.institutionName}</p>
            <Link to={`/chat/new/${tutor.userId}`} className="text-blue-600 text-sm">
              Message this tutor
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
