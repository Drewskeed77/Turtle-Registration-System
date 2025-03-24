import { useNavigate } from "react-router-dom";

export default function UserCard({ user, onUpdate }) {
    const navigate = useNavigate();

    return (
        <div className="p-4 mb-2 bg-white rounded shadow m-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">{user.fullName}</h3>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Role: {user.role}</p>
                    <p className="text-sm text-gray-600">Created: {user.created}</p>
                </div>
                <div className="flex flex-col space-y-2">
                    <button 
                        onClick={() => navigate(`/update-user`, { state: { user } })}
                        className="px-4 py-1  bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
