"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";

interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void>;
    employee?: Employee;
}

export default function EmployeeForm({
    open,
    onClose,
    onSuccess,
    employee,
}: EmployeeFormProps) {
    const isEdit = !!employee;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [status, setStatus] = useState("ACTIVE");
    const [joiningDate, setJoiningDate] = useState("");

    // Initialize/Reset form states
    useEffect(() => {
        if (open) {
            setError(null);
            if (employee) {
                setEmployeeId(employee.employeeId || "");
                setFirstName(employee.firstName || "");
                setLastName(employee.lastName || "");
                setEmail(employee.email || "");
                // If phone is not in the type, try to cast or default
                setPhone((employee as any).phone || "");
                setDepartment(employee.department || "");
                setDesignation(employee.designation || "");
                setUserId(employee.userId || "");
                setPassword(""); // clear password field on edit
                setRole(employee.role || "EMPLOYEE");
                setStatus(employee.status || "ACTIVE");
                
                // Format date string for input type="date"
                const rawDate = (employee as any).joiningDate;
                if (rawDate) {
                    const d = new Date(rawDate);
                    const formatted = d.toISOString().split("T")[0];
                    setJoiningDate(formatted);
                } else {
                    setJoiningDate("");
                }
            } else {
                setEmployeeId("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setDepartment("");
                setDesignation("");
                setUserId("");
                setPassword("");
                setRole("EMPLOYEE");
                setStatus("ACTIVE");
                setJoiningDate(new Date().toISOString().split("T")[0]); // Default to today
            }
        }
    }, [open, employee]);

    if (!open) return null;

    const resetForm = () => {
        setEmployeeId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setDesignation("");
        setUserId("");
        setPassword("");
        setRole("EMPLOYEE");
        setStatus("ACTIVE");
        setJoiningDate(new Date().toISOString().split("T")[0]);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            employeeId,
            firstName,
            lastName,
            email,
            phone,
            department,
            designation,
            userId,
            role,
            status,
            joiningDate,
            ...(password ? { password } : {}),
        };

        try {
            const url = isEdit
                ? `/api/admin/employees/${(employee as any)._id}`
                : "/api/admin/employees";
            const method = isEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to save employee.");
            }

            // 1. Reload the employee table
            await onSuccess();
            // 2. Reset the form fields
            resetForm();
            // 3. Show success message
            alert(
                isEdit
                    ? "Employee updated successfully."
                    : "Employee created successfully."
            );
            // 4. Close the modal
            onClose();
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {isEdit ? "Edit Employee Details" : "Add New Employee"}
                    </h2>
                    <button
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-55 border border-red-200 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Employee ID */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Employee ID *
                            </label>
                            <input
                                type="text"
                                required
                                disabled={isEdit}
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                placeholder="EMP001"
                            />
                        </div>

                        {/* User ID */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                User ID (Login Username) *
                            </label>
                            <input
                                type="text"
                                required
                                disabled={isEdit}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                                placeholder="john.doe"
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                First Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="John"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="john.doe@example.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="9876543210"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Department *
                            </label>
                            <input
                                type="text"
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Engineering"
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Designation *
                            </label>
                            <input
                                type="text"
                                required
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Software Engineer"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Password {isEdit ? "(Leave blank to keep current)" : "*"}
                            </label>
                            <input
                                type="password"
                                required={!isEdit}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Joining Date */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Joining Date *
                            </label>
                            <input
                                type="date"
                                required
                                value={joiningDate}
                                onChange={(e) => setJoiningDate(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Role *
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="EMPLOYEE">Employee</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                Status *
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            disabled={loading}
                            className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                ? "Update Employee"
                                : "Create Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
