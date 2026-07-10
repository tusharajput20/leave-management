"use client";

import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "@/lib/employee";
import { Employee } from "@/types/employee";
import EmployeeForm from "@/components/EmployeeForm";

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {
            await deleteEmployee(id);
            await loadEmployees();
        } catch (error) {
            console.error(error);
            alert("Failed to delete employee.");
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Employees</h1>
                <button
                    onClick={() => {
                        setSelectedEmployee(undefined);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Employee
                </button>
            </div>

            {loading && employees.length === 0 ? (
                <p className="text-gray-600">Loading employees...</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3">Employee ID</th>
                            <th className="text-left py-3">Name</th>
                            <th className="text-left py-3">Department</th>
                            <th className="text-left py-3">Role</th>
                            <th className="text-left py-3">Status</th>
                            <th className="text-left py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id} className="border-b">
                                <td className="py-4">{employee.employeeId}</td>
                                <td>
                                    {employee.firstName} {employee.lastName}
                                </td>
                                <td>{employee.department}</td>
                                <td>{employee.role}</td>
                                <td>{employee.status}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setIsModalOpen(true);
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <EmployeeForm
                open={isModalOpen}
                employee={selectedEmployee}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEmployee(undefined);
                }}
                onSuccess={loadEmployees}
            />
        </div>
    );
}
