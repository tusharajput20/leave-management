import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div>
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                    {title}
                </span>
                <h3 className="text-3xl font-bold text-gray-950 mt-2">
                    {value}
                </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 transition-colors duration-300">
                {icon}
            </div>
        </div>
    );
}
