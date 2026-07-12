"use client";

import { Leave } from "@/types/leave";
import EmptyLeaveState from "./EmptyLeaveState";
import LeaveRow from "./LeaveRow";

interface LeaveTableProps {
    leaves: Leave[];
    onEdit: (leave: Leave) => void;
    onDelete: (id: string) => void;
}

export default function LeaveTable({
    leaves,
    onEdit,
    onDelete,
}: LeaveTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">My Leave Requests</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3">Leave Type</th>
                            <th className="text-left px-4 py-3">Start Date</th>
                            <th className="text-left px-4 py-3">End Date</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaves.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-0 border-none">
                                    <EmptyLeaveState />
                                </td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <LeaveRow
                                    key={leave._id}
                                    leave={leave}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
