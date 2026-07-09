import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Leave from "@/models/Leave";

export async function GET() {
    try {
        await connectDB();

        const [
            totalEmployees,
            activeEmployees,
            inactiveEmployees,
            pendingLeaves,
            approvedLeaves,
            rejectedLeaves,
            employeesOnLeave,
        ] = await Promise.all([
            User.countDocuments({}),
            User.countDocuments({ status: "ACTIVE" }),
            User.countDocuments({ status: "INACTIVE" }),
            Leave.countDocuments({ status: "PENDING" }),
            Leave.countDocuments({ status: "APPROVED" }),
            Leave.countDocuments({ status: "REJECTED" }),
            Leave.countDocuments({
                status: "APPROVED",
                startDate: { $lte: new Date() },
                endDate: { $gte: new Date() },
            }),
        ]);

        return NextResponse.json(
            {
                success: true,
                data: {
                    totalEmployees,
                    activeEmployees,
                    inactiveEmployees,
                    pendingLeaves,
                    approvedLeaves,
                    rejectedLeaves,
                    employeesOnLeave,
                },
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load dashboard.",
            },
            {
                status: 500,
            }
        );
    }
}
