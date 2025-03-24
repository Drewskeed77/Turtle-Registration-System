import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import AccountCenter from "../components/AccountCenter";
import SignUpBtn from "../components/SignUpBtn";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost/api/index.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "loginUser",
                    email: email,
                    password: password
                }),
            });
    
            const data = await response.json();
    
            if (data.status === "success" && data.user.role === "User") {
                sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user data
                navigate("/dashboard"); // Redirect to dashboard
            } else if (data.status === "success" && (data.user.role === "Admin" || data.user.role === "Vet")) {
                sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user data
                navigate("/admin-dashboard")
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };
    
    

    return (
        <>
            <Topbar children={<AccountCenter comp1={<SignUpBtn />} />} />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Login</h2>
                    
                    {error && (
                        <div className="bg-red-500 text-white p-3 mb-4 rounded-md text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input 
                                type="email" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input 
                                type="password" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="w-full bg-[#93E9BE] hover:bg-[#84d1ab] text-white py-3 px-6 rounded-lg font-semibold transition duration-200"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
