export default function LeaveTableSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
            <div className="p-6 border-b">
                <div className="h-7 w-56 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="p-6 space-y-5">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center">
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
                            <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
