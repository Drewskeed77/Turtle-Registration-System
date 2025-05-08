import { useEffect, useState } from "react";
import TurtleCard from "./TurtleCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [turtles, setTurtles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(() => {
        return JSON.parse(sessionStorage.getItem("user"));
    });

    useEffect(() => {
        if (user?.user_id) {
            fetchTurtles(user.user_id);
        }
    }, [user?.user_id]);

    const fetchTurtles = async (user_id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:80/api/index.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "getUserTurtles", user_id }),
            });

            const data = await response.json();
            if (data.status === "success") {
                setTurtles(data.turtles);
            } else {
                setError(data.message || "Error fetching turtles");
            }
        } catch (error) {
            setError("Request failed: " + error.message);
            console.error("Request failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="text-center mb-6 relative">
                {(user?.role === "Admin" || user?.role === "Vet") && (
                    <button 
                        className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Admin Portal
                    </button>
                )}
                <h1 className="text-2xl font-semibold text-gray-700">
                    Your Turtles
                </h1>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-10">
                    <p>Loading your turtles...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {/* Turtles List */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[800px] overflow-y-auto">
                {!loading && !error && (
                    <>
                        {turtles.length > 0 ? (
                            <div className="space-y-6">
                                {turtles.map((turtle) => (
                                    <TurtleCard key={turtle.turtle_id} turtle={turtle} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-600 mb-4">No turtles found.</p>
                                <button
                                    onClick={() => navigate("/register-turtle")}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Add Your First Turtle
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}