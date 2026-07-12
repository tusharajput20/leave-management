"use client";

import { useEffect, useState } from "react";
import ApplyLeaveForm from "@/components/employee/ApplyLeaveForm";
import LeaveTable from "@/components/employee/LeaveTable";
import LeaveTableSkeleton from "@/components/employee/LeaveTableSkeleton";
import { Leave } from "@/types/leave";
import { getLeaves, deleteLeave } from "@/lib/leave";

export default function EmployeeLeavePage() {
    const [leaves, setLeaves] = useState<Leave[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingLeave, setEditingLeave] = useState<Leave | null>(null);

    async function loadLeaves() {
        try {
            setLoading(true);
            const data = await getLeaves();
            setLeaves(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLeaves();
    }, []);

    async function handleDelete(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to delete this leave request?");

        if (!confirmDelete) return;

        try {
            await deleteLeave(id);
            alert("Leave deleted successfully.");
            await loadLeaves();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="space-y-8">
            <ApplyLeaveForm
                editingLeave={editingLeave}
                onSuccess={() => {
                    setEditingLeave(null);
                    loadLeaves();
                }}
                onCancelEdit={() => setEditingLeave(null)}
            />

            {loading ? (
                <LeaveTableSkeleton />
            ) : (
                <LeaveTable leaves={leaves} onEdit={setEditingLeave} onDelete={handleDelete} />
            )}
        </div>
    );
}
