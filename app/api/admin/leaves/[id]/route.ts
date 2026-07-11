import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Leave from "@/models/Leave";
import { verifyToken } from "@/lib/jwt";
import { z } from "zod";

const updateLeaveSchema = z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
    remarks: z.string().optional(),
});

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

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

        const admin = verifyToken(token);

        if (admin.role !== "ADMIN") {
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

        const body = await request.json();

        const validation = updateLeaveSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: validation.error.flatten(),
                },
                {
                    status: 400,
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

        leave.status = validation.data.status;
        leave.remarks = validation.data.remarks || "";
        leave.approvedBy = admin.id;
        leave.approvedAt = new Date();

        await leave.save();

        return NextResponse.json(
            {
                success: true,
                message: `Leave ${validation.data.status.toLowerCase()} successfully.`,
                data: leave,
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
                message: "Failed to update leave request.",
            },
            {
                status: 500,
            }
        );
    }
}
