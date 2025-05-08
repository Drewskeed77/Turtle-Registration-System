import { Link, Navigate } from "react-router-dom";
import warning from "../risk-icon.svg";

const UnauthorizedPage = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // Not signed in at all
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role is null/undefined
    if (user.role === null || user.role === undefined) {
        return <Navigate to="/signup" replace />;
    }

    // Has role but unauthorized - show normal unauthorized page
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-lg">
                <img 
                    src={warning} 
                    alt="Unauthorized Access" 
                    className="mx-auto mb-4 rounded-lg"
                    width={100}
                    height={100}
                />
                <h1 className="text-4xl font-bold mb-2">Unauthorized</h1>
                <p className="text-lg mb-4">You do not have permission to view this page.</p>
                <Link 
                    to={user.role === "User" ? "/dashboard" : "/admin-dashboard"}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Go Back to {user.role === "User" ? "Dashboard" : "Admin Dashboard"}
                </Link>
                <div>
                    <a className="text-xs text-gray-700" href="https://www.flaticon.com/free-icons/error" title="error icons">
                        Error icon created by Freepik - Flaticon
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;