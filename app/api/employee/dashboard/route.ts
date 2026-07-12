import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Leave from "@/models/Leave";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const decoded = verifyToken(token);

        if (decoded.role !== "EMPLOYEE") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden",
                },
                {
                    status: 403,
                }
            );
        }

        const pendingLeaves = await Leave.countDocuments({
            employeeId: decoded.id,
            status: "PENDING",
        });

        const approvedLeaves = await Leave.countDocuments({
            employeeId: decoded.id,
            status: "APPROVED",
        });

        const rejectedLeaves = await Leave.countDocuments({
            employeeId: decoded.id,
            status: "REJECTED",
        });

        return NextResponse.json({
            pendingLeaves,
            approvedLeaves,
            rejectedLeaves,
            totalLeaves:
                pendingLeaves +
                approvedLeaves +
                rejectedLeaves,
        });
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
