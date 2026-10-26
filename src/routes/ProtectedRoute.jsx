import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// requiredRole: optional — "admin", "tutor", "student". Omit to just
// require any logged-in user.
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}
