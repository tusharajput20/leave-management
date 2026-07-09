import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";

const loginSchema = z.object({
    userId: z.string().min(3),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input.",
                    errors: result.error.flatten().fieldErrors,
                },
                {
                    status: 400,
                }
            );
        }

        const { userId, password } = result.data;

        const user = await User.findOne({ userId });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid User ID or Password.",
                },
                {
                    status: 401,
                }
            );
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid User ID or Password.",
                },
                {
                    status: 401,
                }
            );
        }

        const token = generateToken({
            id: user._id,
            userId: user.userId,
            role: user.role,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Login successful.",
                token,
                user: {
                    id: user._id,
                    employeeId: user.employeeId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userId: user.userId,
                    role: user.role,
                },
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}
