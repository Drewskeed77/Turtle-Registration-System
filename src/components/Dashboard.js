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
            const response = await fetch("http://localhost/api/index.php", {
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
        <div className="mx-16 my-16">
            <div className="my-12">
                <button className="px-8 py-2 rounded-t-md bg-slate-300">
                    Your Turtles
                </button>
                <div className="bg-slate-300 max-h-[800px] overflow-y-auto scrollbar-hide">
                    {turtles.length > 0 ? (
                        turtles.map((turtle) => (
                            <TurtleCard key={turtle.turtle_id} turtle={turtle} />
                        ))
                    ) : (
                        <p className="p-4">No turtles found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
