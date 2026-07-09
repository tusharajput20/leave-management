import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";

async function seedAdmin() {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({
            userId: "admin",
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        const hashedPassword = await hashPassword("admin123");

        const adminUser = new User({
            employeeId: "EMP001",
            firstName: "System",
            lastName: "Admin",
            userId: "admin",
            password: hashedPassword,
            email: "admin@example.com",
            phone: "9999999999",
            role: "ADMIN",
            department: "Administration",
            designation: "Administrator",
            joiningDate: new Date(),
            status: "ACTIVE",
        });

        await adminUser.save();

        console.log("✅ Admin user created successfully.");
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await mongoose.connection.close();
    }
}

seedAdmin();
