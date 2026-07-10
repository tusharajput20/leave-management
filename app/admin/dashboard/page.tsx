"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "@/types/dashboard";
import { getDashboardStats } from "@/lib/dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import StatCard from "@/components/dashboard/StatCard";
import {
    Users,
    UserCheck,
    Clock3,
    CircleCheck,
    CircleX,
    CalendarDays,
    RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadDashboard = async (isSilent = false) => {
        if (!isSilent) {
            setLoading(true);
        } else {
            setRefreshing(true);
        }
        setError("");
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Unable to load dashboard.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div>
                <DashboardHeader />
                <DashboardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <DashboardHeader />
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-xl mx-auto mt-12">
                    <p className="text-red-800 font-medium">{error}</p>
                    <button
                        onClick={() => loadDashboard()}
                        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    // Phase 5 Empty State
    const isEmpty = stats.totalEmployees === 0;

    return (
        <div>
            <div className="flex justify-between items-start">
                <DashboardHeader />
                <button
                    onClick={() => loadDashboard(true)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium text-sm transition disabled:opacity-50"
                >
                    <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {isEmpty ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-12 text-center max-w-md mx-auto mt-12">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">No employee data yet.</h3>
                    <p className="text-gray-500 text-sm mt-1">Get started by adding employees to your system.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={<Users size={24} />}
                    />
                    <StatCard
                        title="Active Employees"
                        value={stats.activeEmployees}
                        icon={<UserCheck size={24} />}
                    />
                    <StatCard
                        title="Pending Leaves"
                        value={stats.pendingLeaves}
                        icon={<Clock3 size={24} />}
                    />
                    <StatCard
                        title="Approved Leaves"
                        value={stats.approvedLeaves}
                        icon={<CircleCheck size={24} />}
                    />
                    <StatCard
                        title="Rejected Leaves"
                        value={stats.rejectedLeaves}
                        icon={<CircleX size={24} />}
                    />
                    <StatCard
                        title="Employees On Leave"
                        value={stats.employeesOnLeave}
                        icon={<CalendarDays size={24} />}
                    />
                </div>
            )}
        </div>
    );
}
