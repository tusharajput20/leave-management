"use client";

import { Pencil, Trash2, Eye } from "lucide-react";
import { Leave } from "@/types/leave";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface LeaveRowProps {
    leave: Leave;
    onEdit: (leave: Leave) => void;
    onDelete: (id: string) => void;
}

export default function LeaveRow({
    leave,
    onEdit,
    onDelete,
}: LeaveRowProps) {
    return (
        <tr className="border-b last:border-none hover:bg-gray-50 transition">
            <td className="px-4 py-4">{leave.leaveType}</td>

            <td className="px-4 py-4">
                {new Date(leave.startDate).toLocaleDateString()}
            </td>

            <td className="px-4 py-4">
                {new Date(leave.endDate).toLocaleDateString()}
            </td>

            <td className="px-4 py-4">
                <LeaveStatusBadge status={leave.status} />
            </td>

            <td className="px-4 py-4">
                {leave.status === "PENDING" ? (
                    <div className="flex gap-3">
                        <button
                            onClick={() => onEdit(leave)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <Pencil size={18} />
                        </button>

                        <button
                            onClick={() => onDelete(leave._id)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ) : (
                    <button className="text-gray-600 hover:text-gray-800">
                        <Eye size={18} />
                    </button>
                )}
            </td>
        </tr>
    );
}
