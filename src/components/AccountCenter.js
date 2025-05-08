import { useState, useEffect } from "react";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";

export default function AccountCenter() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on component mount
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        setIsAuthenticated(!!user); // Convert to boolean
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Completely remove all sessionStorage data
        setIsAuthenticated(false);
        window.location.href = "/"; // Redirect to home after logout
    };

    return (
        <div className="flex gap-2">
            {isAuthenticated ? (
                <button className="px-4 py-2 bg-[#93E9BE] text-black rounded" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <>
                    <LoginBtn />
                    <SignUpBtn />
                </>
            )}
        </div>
    );
}
