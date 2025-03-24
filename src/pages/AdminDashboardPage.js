import { useState } from "react";
import AccountCenter from "../components/AccountCenter";
import TurtlesDashboard from "../components/TurtlesDashboard";
import UsersDashboard from "../components/UsersDashboard";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { useLocation } from "react-router-dom";

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();

    // Check which page we are on to render the correct dashboard
    const isTurtlesPage = location.pathname === "/admin-dashboard";
    const isUsersPage = location.pathname === "/manage-users"; 

    return (
        <div>
            <Topbar>
                <div className="flex space-x-4">
                    <SearchBar onSearch={setSearchQuery} />
                    <AccountCenter comp1={<Logout />} />
                </div>
            </Topbar>
    
            {/* Show Dashboard based on the URL */}
            {isTurtlesPage ? (
                <TurtlesDashboard searchQuery={searchQuery} />
            ) : isUsersPage ? (
                <UsersDashboard searchQuery={searchQuery} />
            ) : (
                <p>Page Not Found</p>
            )}
    
            <Footer />
        </div>
    );
}
