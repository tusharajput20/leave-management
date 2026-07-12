import EmployeeSidebar from "@/components/employee/EmployeeSidebar";

export default function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <EmployeeSidebar />

            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
