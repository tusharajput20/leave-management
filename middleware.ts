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
}
