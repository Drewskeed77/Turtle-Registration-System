import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import UserCard from "./UserCard";
import Topbar from "./Topbar";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

export default function UsersDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Store search query
    const navigate = useNavigate(); // ✅ Initialize navigation

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost/api/index.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({ action: "getAllUsers" }),
                });

                const data = await response.json();
                if (data.status === "success") {
                    setUsers(data.users);
                } else {
                    console.error("Error fetching users:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on searchQuery
    const filteredUsers = users.filter(
        (user) =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Searching by name or email
    );

    return (
        <div>
            <Topbar>
                <div className="flex space-x-4">
                    <SearchBar onSearch={setSearchQuery} />
                </div>
            </Topbar>

            <div className="mx-16 my-64">
                <div>
                    {/* ✅ Button to Navigate to Turtles Dashboard */}
                    <button
                        className="px-8 py-2 pt-4 rounded-t-md bg-slate-300"
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Turtles
                    </button>

                    {/* Button for Users Dashboard */}
                    <button className="px-8 py-2 pt-0 rounded-t-md bg-slate-300">
                        Manage Users
                    </button>

                    <div className="bg-slate-300 max-h-[400px] overflow-y-auto hide-scrollbar">
                        {loading ? (
                            <p className="p-4">Loading users...</p>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <UserCard key={user.email} user={user} />
                            ))
                        ) : (
                            <p className="p-4">No users found.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
