import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useAuthContext } from "../../../context/AuthContext";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: setAuthState } = useAuthContext();

  const register = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register(payload);
      setAuthState(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(payload);
      setAuthState(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, login, isLoading, error };
}
