import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import TurtleCard from "./TurtleCard";
import Topbar from "./Topbar";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

export default function TurtlesDashboard() {
    const [turtles, setTurtles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Store search query
    const navigate = useNavigate(); // ✅ Initialize navigation

    useEffect(() => {
        const fetchTurtles = async () => {
            try {
                const response = await fetch("http://localhost/api/index.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
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

    // Filter turtles based on search query
    const filteredTurtles = turtles.filter(
        (turtle) =>
            turtle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            turtle.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (turtle.owner && turtle.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <Topbar>
                    <div className="flex space-x-4">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                </Topbar>

                <div className="mx-16 my-32">
                    <div>
                        {/* Button for Turtles Dashboard */}
                        <button className="px-8 py-2 pt-4 rounded-t-md bg-slate-300">
                            Turtles
                        </button>

                        {/* ✅ Button to Navigate to Users Dashboard */}
                        <button
                            className="px-8 py-2 pt-0 rounded-t-md bg-slate-300"
                            onClick={() => navigate("/manage-users")}
                        >
                            Manage Users
                        </button>

                        <div className="bg-slate-300 max-h-[400px] overflow-y-auto hide-scrollbar p-4">
                            {loading ? (
                                <p>Loading turtles...</p>
                            ) : filteredTurtles.length > 0 ? (
                                filteredTurtles.map((turtle) => (
                                    <TurtleCard key={turtle.turtle_id} turtle={turtle} />
                                ))
                            ) : (
                                <p>No turtles found.</p>
                            )}
                        </div>
                    </div>
                </div>

                <Footer   />
            </div>
        </div>
    );
}
