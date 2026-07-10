import { Employee } from "@/types/employee";

export async function getEmployees(): Promise<Employee[]> {

    const response = await fetch("/api/admin/employees");

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result.employees;
}

export async function deleteEmployee(id: string) {
    const response = await fetch(`/api/admin/employees/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
