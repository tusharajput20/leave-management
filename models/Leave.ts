import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        leaveType: {
            type: String,
            enum: [
                "CASUAL",
                "SICK",
                "EARNED",
                "MATERNITY",
                "PATERNITY",
                "UNPAID",
            ],
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        totalDays: {
            type: Number,
            required: true,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        approvedAt: {
            type: Date,
            default: null,
        },

        remarks: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Leave =
    mongoose.models.Leave || mongoose.model("Leave", leaveSchema);

export default Leave;
