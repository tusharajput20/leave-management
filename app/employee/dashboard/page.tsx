"use client";

import { useEffect, useState } from "react";
import { getEmployeeDashboardStats } from "@/lib/employeeDashboard";
import EmployeeHeader from "@/components/employee/EmployeeHeader";
import EmployeeDashboardSkeleton from "@/components/employee/EmployeeDashboardSkeleton";
import EmployeeStatCard from "@/components/employee/EmployeeStatCard";
import {
    Clock3,
    CircleCheck,
    CircleX,
    CalendarDays,
    RefreshCw,
} from "lucide-react";
import { EmployeeDashboardStats } from "@/types/employeeDashboard";

export default function EmployeeDashboardPage() {
    const [stats, setStats] = useState<EmployeeDashboardStats | null>(null);
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
            const data = await getEmployeeDashboardStats();
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
                <EmployeeHeader />
                <EmployeeDashboardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <EmployeeHeader />
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

    return (
        <div>
            <div className="flex justify-between items-start">
                <EmployeeHeader />
                <button
                    onClick={() => loadDashboard(true)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium text-sm transition disabled:opacity-50"
                >
                    <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <EmployeeStatCard
                    title="Pending Leaves"
                    value={stats.pendingLeaves}
                    icon={<Clock3 size={24} />}
                />
                <EmployeeStatCard
                    title="Approved Leaves"
                    value={stats.approvedLeaves}
                    icon={<CircleCheck size={24} />}
                />
                <EmployeeStatCard
                    title="Rejected Leaves"
                    value={stats.rejectedLeaves}
                    icon={<CircleX size={24} />}
                />
                <EmployeeStatCard
                    title="Total Leaves"
                    value={stats.totalLeaves}
                    icon={<CalendarDays size={24} />}
                />
            </div>
        </div>
    );
}
