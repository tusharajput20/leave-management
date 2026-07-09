import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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

    try {
        const decoded = verifyToken(token);

        const pathname = request.nextUrl.pathname;

        if (
            pathname.startsWith("/api/admin") &&
            decoded.role !== "ADMIN"
        ) {
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

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid or expired token.",
            },
            {
                status: 401,
            }
        );
    }
}

export const config = {
    matcher: [
        "/api/admin/:path*",
        "/api/employee/:path*",
    ],
};
