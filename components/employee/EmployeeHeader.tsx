"use client";

import { useEffect, useState } from "react";

export default function EmployeeHeader() {
    const [employeeName, setEmployeeName] = useState("Employee");
    const [greeting, setGreeting] = useState("Good Morning");
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                if (userObj.firstName) {
                    setEmployeeName(userObj.firstName);
                }
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }

        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good Morning");
        } else if (hour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }

        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        setFormattedDate(new Date().toLocaleDateString("en-US", options));
    }, []);

    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-gray-500 mt-2 text-lg">
                    {greeting}, <span className="font-semibold text-blue-600">{employeeName}</span>
                </p>
                <p className="text-sm text-gray-400 mt-1">Today's overview</p>
            </div>
            {formattedDate && (
                <div className="text-right">
                    <p className="text-gray-600 font-medium">{formattedDate}</p>
                </div>
            )}
        </div>
    );
}
