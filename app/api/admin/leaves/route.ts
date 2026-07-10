import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Leave from "@/models/Leave";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

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

        if (decoded.role !== "ADMIN") {
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

        await connectDB();

        const leaves = await Leave.find()
            .populate(
                "employee",
                "employeeId firstName lastName userId department designation"
            )
            .populate(
                "approvedBy",
                "firstName lastName userId"
            )
            .sort({
                createdAt: -1,
            });

        return NextResponse.json(
            {
                success: true,
                count: leaves.length,
                data: leaves,
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
                message: "Failed to fetch leave requests.",
            },
            {
                status: 500,
            }
        );
    }
}
