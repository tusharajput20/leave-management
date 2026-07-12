"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { applyLeave, updateLeave } from "@/lib/leave";
import { Leave } from "@/types/leave";

interface ApplyLeaveFormProps {
    editingLeave?: Leave | null;
    onSuccess: () => void;
    onCancelEdit?: () => void;
}

export default function ApplyLeaveForm({
    editingLeave,
    onSuccess,
    onCancelEdit,
}: ApplyLeaveFormProps) {
    const [leaveType, setLeaveType] = useState(editingLeave?.leaveType || "");
    const [startDate, setStartDate] = useState(
        editingLeave?.startDate ? editingLeave.startDate.slice(0, 10) : ""
    );
    const [endDate, setEndDate] = useState(
        editingLeave?.endDate ? editingLeave.endDate.slice(0, 10) : ""
    );
    const [reason, setReason] = useState(editingLeave?.reason || "");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (editingLeave) {
            setLeaveType(editingLeave.leaveType);
            setStartDate(editingLeave.startDate.slice(0, 10));
            setEndDate(editingLeave.endDate.slice(0, 10));
            setReason(editingLeave.reason);
        } else {
            setLeaveType("");
            setStartDate("");
            setEndDate("");
            setReason("");
        }
    }, [editingLeave]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!leaveType || !startDate || !endDate || !reason.trim()) {
            setError("Please fill all fields.");
            return;
        }

        if (reason.trim().length < 10) {
            setError("Reason must contain at least 10 characters.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setError("Start date cannot be after end date.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                leaveType,
                startDate,
                endDate,
                reason,
            };

            if (editingLeave) {
                await updateLeave(editingLeave._id, payload);
            } else {
                await applyLeave(payload);
            }

            setLeaveType("");
            setStartDate("");
            setEndDate("");
            setReason("");
            setSuccess(
                editingLeave ? "Leave updated successfully." : "Leave applied successfully."
            );

            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingLeave ? "Update Leave" : "Apply Leave"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Leave Type</label>

                    <select
                        value={leaveType}
                        disabled={loading}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-600 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Select Leave Type</option>
                        <option>Casual Leave</option>
                        <option>Sick Leave</option>
                        <option>Earned Leave</option>
                        <option>Maternity Leave</option>
                        <option>Paternity Leave</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            min={new Date().toISOString().split("T")[0]}
                            disabled={loading}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate || new Date().toISOString().split("T")[0]}
                            disabled={loading}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Reason</label>
                    <textarea
                        rows={4}
                        maxLength={500}
                        value={reason}
                        disabled={loading}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <div className="flex justify-end mt-2">
                        <span className="text-xs text-gray-500">
                            {reason.length}/500
                        </span>
                    </div>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                {success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {editingLeave ? "Update Leave" : "Apply Leave"}
                    </button>

                    {editingLeave && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
