import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

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
        <div className="login-container">
            <form onSubmit={handleSubmit} className="form-box">
                <h1 className="form-title">Admin Login</h1>

                {error && <p className="error-message">{error}</p>}

                <label className="form-label">Email</label>
                <input 
                    type="email"
                    required
                    className="input-style"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form-label">Password</label>
                <input
                    type="password"
                    required
                    className="input-style"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type = "submit" className="primary-button">
                    Log In
                </button>

                <div className="login-actions">
                    <a href="/" className="link-accent">
                    ← Back to home
                    </a>
                    <a href="/reset-password" className="link-accent">
                    Forgot password?
                    </a>
                </div>
            </form>
        </div>
    );
}