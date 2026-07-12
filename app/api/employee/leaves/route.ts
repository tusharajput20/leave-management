import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Leave from "@/models/Leave";
import User from "@/models/User";

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

        const leaves = await Leave.find({
            employeeId: decoded.id,
        }).sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            leaves,
        });
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

export async function POST(req: NextRequest) {
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

        const body = await req.json();

        const { leaveType, startDate, endDate, reason } = body;

        const employee = await User.findById(decoded.id);

        if (!employee) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Employee not found.",
                },
                {
                    status: 404,
                }
            );
        }

        const leave = await Leave.create({
            employeeId: employee._id,
            userId: employee.userId,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Leave applied successfully.",
                leave,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to apply leave.",
            },
            {
                status: 500,
            }
        );
    }
}
