import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        userId: {
            type: String,
            required: true,
        },

        employeeName: {
            type: String,
            required: true,
        },

        leaveType: {
            type: String,
            enum: [
                "Casual Leave",
                "Sick Leave",
                "Earned Leave",
                "Maternity Leave",
                "Paternity Leave",
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
    },
    {
        timestamps: true,
    }
);

const Leave = mongoose.models.Leave || mongoose.model("Leave", leaveSchema);

export default Leave;
