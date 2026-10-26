import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "../../../components/common/Button";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", phoneOrEmail: "", password: "" });
  const { register, isLoading, error } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-xl font-semibold mb-4">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border rounded-md px-3 py-2" name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} />
        <input className="w-full border rounded-md px-3 py-2" name="phoneOrEmail" placeholder="Phone or email" value={form.phoneOrEmail} onChange={handleChange} />
        <input className="w-full border rounded-md px-3 py-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <ErrorMessage message={error} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
