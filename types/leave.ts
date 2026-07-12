export interface Leave {
    _id: string;

    employeeId: string;

    userId: string;

    employeeName: string;

    leaveType: string;

    startDate: string;

    endDate: string;

    reason: string;

    status: "PENDING" | "APPROVED" | "REJECTED";

    createdAt: string;
}
