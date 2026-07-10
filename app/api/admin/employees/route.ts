import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { z } from "zod";
import { hashPassword } from "@/lib/password";
import { verifyToken } from "@/lib/jwt";

const employeeSchema = z.object({
    employeeId: z.string().min(1),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    userId: z.string().min(3),
    password: z.string().min(6),
    email: z.string().email(),
    phone: z.string().min(10),
    role: z.enum(["ADMIN", "EMPLOYEE"]),
    department: z.string().min(2),
    designation: z.string().min(2),
    joiningDate: z.string(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

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

        const employees = await User.find(
            {},
            {
                password: 0,
            }
        ).sort({
            createdAt: -1,
        });

        return NextResponse.json(
            {
                success: true,
                count: employees.length,
                data: employees,
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
                message: "Failed to fetch employees.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
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

        const body = await request.json();

        const validation = employeeSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input.",
                    errors: validation.error.flatten(),
                },
                {
                    status: 400,
                }
            );
        }

        const {
            employeeId,
            firstName,
            lastName,
            userId,
            password,
            email,
            phone,
            role,
            department,
            designation,
            joiningDate,
            status,
        } = validation.data;

        const existingUser = await User.findOne({
            $or: [
                { employeeId },
                { userId },
                { email },
            ],
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Employee already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword = await hashPassword(password);

        const employee = await User.create({
            employeeId,
            firstName,
            lastName,
            userId,
            password: hashedPassword,
            email,
            phone,
            role,
            department,
            designation,
            joiningDate,
            status,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Employee created successfully.",
                data: employee,
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
                message: "Failed to create employee.",
            },
            {
                status: 500,
            }
        );
    }
}
