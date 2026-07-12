import { CalendarX } from "lucide-react";

export default function EmptyLeaveState() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
            <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    <CalendarX size={42} className="text-blue-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">No Leave Requests Yet</h2>

                <p className="text-gray-500 mt-2 text-center max-w-md">
                    You haven't applied for any leave yet. Fill out the form above to submit your first leave request.
                </p>
            </div>
        </div>
    );
}
