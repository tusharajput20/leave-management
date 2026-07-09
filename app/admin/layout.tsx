"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth";
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    LogOut,
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [adminName, setAdminName] = useState("Admin");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                if (userObj.firstName) {
                    setAdminName(userObj.firstName);
                }
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600">
                        LMS
                    </h2>

                    <nav className="mt-10 space-y-2">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/employees"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <Users size={20} />
                            Employees
                        </Link>

                        <Link
                            href="/admin/leaves"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <CalendarDays size={20} />
                            Leave Requests
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-50 text-red-600 transition text-left"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold">
                        Dashboard
                    </h1>

                    <span className="text-gray-600">
                        Welcome, {adminName}
                    </span>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>

        </div>
    );
}
