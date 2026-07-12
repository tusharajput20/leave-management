"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    LogOut,
} from "lucide-react";

export default function EmployeeSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("user");

        router.replace("/");
    }

    const menus = [
        {
            title: "Dashboard",
            href: "/employee/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "My Leaves",
            href: "/employee/leave",
            icon: CalendarDays,
        },
    ];

    return (
        <aside className="w-64 bg-white shadow-lg border-r flex flex-col">
            <div className="px-6 py-8 border-b">
                <h2 className="text-2xl font-bold text-blue-600">
                    Leave Portal
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Employee Panel
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const active = pathname === menu.href;

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                                ${
                                    active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={20} />
                            {menu.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
