import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: 401,
                }
            );
        }

        const decoded = verifyToken(token);

        return NextResponse.json(
            {
                success: true,
                user: decoded,
            },
            {
                status: 200,
            }
        );

    } catch {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 401,
            }
        );
    }
}
