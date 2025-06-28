import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push("/editor");
    } else {
      setError("Login failed or not authorized.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[var(--foreground)]">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div>
          <label className="block mb-1 font-medium text-[var(--secondary-text)]">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[var(--secondary-text)]">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent-blue)] text-white py-2 rounded-md hover:bg-[var(--accent-hover)] transition"
        >
          Log In
        </button>

        <div className="flex justify-between text-sm mt-2">
          <Link href="/" className="text-[var(--accent-hover)] underline">
            Back to home
          </Link>
          <Link
            href="/reset-password"
            className="text-[var(--accent-hover)] underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
