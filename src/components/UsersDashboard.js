import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import Layout from "./Layout/Layout";
import SearchBar from "./SearchBar"; // Assuming you want to use SearchBar component for searching
import { Link } from "react-router-dom";

export default function UsersDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:80/api/index.php",   {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
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

    const filteredUsers = users.filter(
        (user) =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6">
                {/* Top Section with Navigation and Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <div className="flex space-x-2">
                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md"
                            onClick={() => navigate("/admin-dashboard")}
                        >
                            Turtles
                        </button>
                        <button
                            className="px-6 py-2 bg-gray-300  text-black rounded-md shadow-md"
                        >
                            Manage Users
                        </button>
                        <Link className="px-4 py-2 bg-[#93E9BE] text-black rounded" to="/sign-up">Register New User</Link>  
                    </div>

                    {/* Search bar aligned to the right */}
                    <div className="ml-auto">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                </div>

                {/* User List Section */}
                <div className="bg-white p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto hide-scrollbar">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading users...</p>
                    ) : filteredUsers.length > 0 ? (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredUsers.map((user) => (
                                <UserCard key={user.email} user={user} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No users found.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
