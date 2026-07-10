import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined.");
}

const JWT_SECRET: string = secret;

export function generateToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as {
        id: string;
        userId: string;
        role: "ADMIN" | "EMPLOYEE";
    };
}
