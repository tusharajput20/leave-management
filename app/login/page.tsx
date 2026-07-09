"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const userIdRegex = /^[a-z0-9._]{3,30}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default function LoginPage() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.replace("/admin/dashboard");
        }
    }, [router]);

    const validateForm = () => {
        let valid = true;

        setUserIdError("");
        setPasswordError("");

        const trimmedUserId = userId.trim();

        if (!trimmedUserId) {
            setUserIdError("User ID is required.");
            valid = false;
        } else if (!userIdRegex.test(trimmedUserId)) {
            setUserIdError(
                "Use 3-30 lowercase letters, numbers, '.' or '_'."
            );
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required.");
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must contain uppercase, lowercase, number and special character."
            );
            valid = false;
        }

        return valid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setError("Invalid User ID or Password.");
                    return;
                }

                if (response.status === 400) {
                    setError("Please check the highlighted fields.");
                    return;
                }

                if (response.status >= 500) {
                    setError("Server error. Please try again later.");
                    return;
                }

                setError(result.message || "Login failed");
                return;
            }

            localStorage.setItem("token", result.token);

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            setPassword("");
            router.push("/admin/dashboard");

        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Left Section */}
            <div className="hidden lg:flex w-1/2 bg-blue-700 text-white items-center justify-center p-12">

                <div className="max-w-md">

                    <h1 className="text-5xl font-bold leading-tight">
                        Leave Management
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-8">
                        Manage employees, leave requests, approvals and HR
                        operations from one centralized dashboard.
                    </p>

                    <div className="mt-12 space-y-4">

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            Employee Management
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            Leave Approval Workflow
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            Dashboard & Analytics
                        </div>

                    </div>

                </div>

            </div>

            {/* Right Section */}

            <div className="flex-1 flex items-center justify-center p-8">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Sign In
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Welcome back! Please sign in to continue.
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-6"
                    >

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User ID
                            </label>

                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => {
                                    setUserId(e.target.value.trimStart());
                                    setError("");
                                    setUserIdError("");
                                }}
                                placeholder="Enter your User ID"
                                disabled={loading}
                                autoFocus
                                autoComplete="username"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 disabled:bg-gray-100"
                            />

                            {userIdError && (
                                <p className="mt-1 text-sm text-red-600">
                                    {userIdError}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                        setPasswordError("");
                                    }}
                                    placeholder="Enter your Password"
                                    disabled={loading}
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 disabled:bg-gray-100 pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600">
                                    {passwordError}
                                </p>
                            )}

                        </div>

                        {error && (
                            <p className="text-red-600 text-sm">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
