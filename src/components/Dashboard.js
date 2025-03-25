import { useEffect, useState } from "react";
import TurtleCard from "./TurtleCard";

export default function Dashboard() {
    const [turtles, setTurtles] = useState([]);
    const [user, setUser] = useState(() => {
        return JSON.parse(sessionStorage.getItem("user"));
    });

    useEffect(() => {
        if (user?.user_id) {
            fetchTurtles(user.user_id);
        }
    }, [user?.user_id]); // Only triggers when user_id changes

    const fetchTurtles = async (user_id) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "getUserTurtles", user_id }),
            });

            const data = await response.json();
            if (data.status === "success") {
                setTurtles(data.turtles);
            } else {
                console.error("Error fetching turtles:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Your Turtles
                </h1>
            </div>

            {/* Turtles List */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[800px] overflow-y-auto scrollbar-hide">
                {turtles.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                        {turtles.map((turtle) => (
                            <TurtleCard key={turtle.turtle_id} turtle={turtle} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No turtles found.</p>
                )}
            </div>
        </div>
    );
}
