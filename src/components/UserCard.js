import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-6 my-4 mx-auto border">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Text Content */}
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-xl font-semibold">{user.fullName}</h2>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-500">Role: {user.role}</p>
                    <p className="text-gray-400">Created: {user.created}</p>
                    <p className="text-gray-400">Updated at: {user.updated}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4">
                <button
                    onClick={() => navigate(`/update-user`, { state: { user } })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                >
                    Update
                </button>
            </div>
        </div>
    );
}
