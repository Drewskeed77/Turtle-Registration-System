import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Layout from "../components/Layout/Layout";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const response = await fetch("http://localhost:80/api/index.php",  {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "loginUser", email, password }),
            });

            const data = await response.json();

            if (data.status === "success") {
                sessionStorage.setItem("user", JSON.stringify(data.user));

                if (data.user.role === "User") {
                    navigate("/dashboard");
                } else {
                    navigate("/admin-dashboard");
                }
            } else {
                setError(data.message || "Login failed.");
                setTimeout(() => setError(""), 5000); // Auto-dismiss error
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
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
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="w-full bg-[#93E9BE] hover:bg-[#72c7a0] text-black font-bold py-2 px-4 rounded transition duration-200"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}