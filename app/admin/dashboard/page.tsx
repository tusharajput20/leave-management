export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Employees Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Employees
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>

                {/* Pending Leaves Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Pending Leaves
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>

                {/* Approved Leaves Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Approved Leaves
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>

                {/* Rejected Leaves Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Rejected Leaves
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>
            </div>
        </div>
    );
}
