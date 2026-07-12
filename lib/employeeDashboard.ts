import { EmployeeDashboardStats } from "@/types/employeeDashboard";

export async function getEmployeeDashboardStats(): Promise<EmployeeDashboardStats> {
    const response = await fetch("/api/employee/dashboard", {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load dashboard.");
    }

    return response.json();
}
