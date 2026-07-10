import { DashboardStats } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {

    const response = await fetch("/api/admin/dashboard");

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch dashboard stats");
    }

    return result.data;
}