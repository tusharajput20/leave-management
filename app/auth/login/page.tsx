"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) return;

        try {
            const user = JSON.parse(storedUser);

            if (user.role === "ADMIN") {
                router.replace("/admin/dashboard");
            } else {
                router.replace("/employee/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    }, [router]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            localStorage.setItem("user", JSON.stringify(result.user));
            setPassword("");

            if (result.user.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else {
                router.push("/employee/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
                <p className="mt-2 text-sm text-gray-500">Sign in to continue</p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        required
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
