import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

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

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/admin/:path*",
        "/api/employee/:path*",
    ],
};