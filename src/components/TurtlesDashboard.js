import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TurtleCard from "./TurtleCard";
import SearchBar from "./SearchBar";
import Layout from "../components/Layout/Layout";
import RegisterTurtleBtn from "./RegisterTurtleBtn";

export default function TurtlesDashboard() {
    const [turtles, setTurtles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurtles = async () => {
            try {
                const response = await fetch("http://localhost:80/api/index.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "getAllTurtles" }),
                });

                const data = await response.json();
                if (data.status === "success") {
                    setTurtles(data.turtles);
                } else {
                    console.error("Error fetching turtles:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTurtles();
    }, []);

    const filteredTurtles = turtles.filter(
        (turtle) =>
            turtle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            turtle.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
            turtle.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (turtle.owner_name && turtle.owner_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <div className="flex space-x-2">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md">
                            Turtles
                        </button>

                        <button
                            className="px-6 py-2 bg-gray-300 rounded-md shadow-md"
                            onClick={() => navigate("/dashboard")}
                        >
                            Your Turtles
                        </button>

                        <button
                            className="px-6 py-2 bg-gray-300 rounded-md shadow-md"
                            onClick={() => navigate("/manage-users")}
                        >
                            Manage Users
                        </button>
                        
                        <RegisterTurtleBtn />
                    </div>

                    <div className="ml-auto">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto hide-scrollbar">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading turtles...</p>
                    ) : filteredTurtles.length > 0 ? (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTurtles.map((turtle) => (
                                <TurtleCard 
                                    key={turtle.turtle_id} 
                                    turtle={turtle}
                                    showHealthStatus={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No turtles found.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}