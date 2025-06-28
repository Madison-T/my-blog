import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send reset email.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[var(--foreground)]">
          Reset Password
        </h1>

        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
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

        <button
          type="submit"
          className="w-full bg-[var(--accent-blue)] text-white py-2 rounded-md hover:bg-[var(--accent-hover)] transition"
        >
          Send Reset Link
        </button>

        <div className="flex justify-between text-sm mt-2">
          <Link href="/" className="text-[var(--accent-hover)] underline">
            Back to home
          </Link>
          <Link href="/login" className="text-[var(--accent-hover)] underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
