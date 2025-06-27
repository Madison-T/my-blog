import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
    const [ email, setEmail ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ error, setError ] = useState("");
    const router = useRouter();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox.");
        } catch (err: any) {
            setError(err.message || "Failed to send reset email.");
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleReset} className="form-box">
                <h1 className="form-title">Reset Password</h1>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <label className="form-label">Email</label>
                <input
                    type="email"
                    required
                    className="input-style"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className="primary-button">
                        Send Reset Link
                    </button>

                    <div className="login-actions">
                        <a href="/" className="link-accent">← Back to home</a>
                        <a href="/login" className="link-accent">Back to login</a>
                    </div>
            </form>
        </div>
    );
}