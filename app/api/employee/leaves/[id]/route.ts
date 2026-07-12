import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Leave from "@/models/Leave";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        const leave = await Leave.findById(id);

        if (!leave) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Leave request not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (leave.employeeId.toString() !== decoded.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden.",
                },
                {
                    status: 403,
                }
            );
        }

        if (leave.status !== "PENDING") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only pending leave requests can be updated.",
                },
                {
                    status: 400,
                }
            );
        }

        const body = await req.json();

        leave.leaveType = body.leaveType;
        leave.startDate = body.startDate;
        leave.endDate = body.endDate;
        leave.reason = body.reason;

        await leave.save();

        return NextResponse.json({
            success: true,
            message: "Leave updated successfully.",
            leave,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update leave.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        const leave = await Leave.findById(id);

        if (!leave) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Leave request not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (leave.employeeId.toString() !== decoded.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden.",
                },
                {
                    status: 403,
                }
            );
        }

        if (leave.status !== "PENDING") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only pending leave requests can be deleted.",
                },
                {
                    status: 400,
                }
            );
        }

        await Leave.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Leave deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete leave.",
            },
            {
                status: 500,
            }
        );
    }
}
