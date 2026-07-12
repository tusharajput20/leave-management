import { Leave } from "@/types/leave";

export async function getLeaves(): Promise<Leave[]> {
    const response = await fetch("/api/employee/leaves", {
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leaves.");
    }

    return data.leaves;
}

export async function applyLeave(payload: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
}) {
    const response = await fetch("/api/employee/leaves", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to apply leave.");
    }

    return data;
}

export async function updateLeave(
    id: string,
    payload: {
        leaveType: string;
        startDate: string;
        endDate: string;
        reason: string;
    }
) {
    const response = await fetch(`/api/employee/leaves/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update leave.");
    }

    return data;
}

export async function deleteLeave(id: string) {
    const response = await fetch(`/api/employee/leaves/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete leave.");
    }

    return data;
}
