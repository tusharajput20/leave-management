export default function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between animate-pulse"
                >
                    <div className="space-y-3 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                </div>
            ))}
        </div>
    );
}
