import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function ProfilePage() {
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (profile) setFullName(profile.fullName);
  }, [profile]);

  if (isLoading) return <Loader label="Loading profile..." />;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">My Profile</h1>
      <ErrorMessage message={error} />
      {profile && (
        <div className="space-y-3">
          <input
            className="w-full border rounded-md px-3 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <p className="text-sm text-gray-500">Role: {profile.role}</p>
          <Button onClick={() => updateProfile({ fullName })}>Save</Button>
        </div>
      )}
    </div>
  );
}
