import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Leave from "@/models/Leave";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";

const leaveSchema = z.object({
    leaveType: z.enum([
        "CASUAL",
        "SICK",
        "EARNED",
        "MATERNITY",
        "PATERNITY",
        "UNPAID",
    ]),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string().min(5),
});

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const authHeader = request.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
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

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        const body = await request.json();

        const validation = leaveSchema.safeParse(body);

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

        const { leaveType, startDate, endDate, reason } = validation.data;

        const totalDays =
            Math.ceil(
                (new Date(endDate).getTime() -
                    new Date(startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        const leave = await Leave.create({
            employee: employee._id,
            leaveType,
            startDate,
            endDate,
            totalDays,
            reason,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Leave request submitted successfully.",
                data: leave,
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
                message: "Failed to submit leave request.",
            },
            {
                status: 500,
            }
        );
    }
}
