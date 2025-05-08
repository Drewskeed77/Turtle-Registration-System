import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Layout from '../components/Layout/Layout';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ level: "", color: "bg-gray-300", score: 0 });
    
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        street: "",
        aptLot: "",
        city: "",
        state: "",
        zipCode: "",
        password: "",
    });

    const evaluatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

        const strengthLevels = [
            { level: "Weak", color: "bg-red-500", score: 25 },
            { level: "Moderate", color: "bg-yellow-500", score: 50 },
            { level: "Strong", color: "bg-green-500", score: 100 }
        ];

        setPasswordStrength(
            score >= 3 ? strengthLevels[2] :
            score === 2 ? strengthLevels[1] :
            strengthLevels[0]
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "password") {
            evaluatePasswordStrength(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.firstName || !formData.password || !formData.street || !formData.city || !formData.state || !formData.zipCode) {
            alert("Please fill in all required fields.");
            return;
        }
        const fullAddress = `${formData.street}, ${formData.aptLot ? formData.aptLot + ', ' : ''}${formData.city}, ${formData.state} ${formData.zipCode}`;
        const apiUrl = "http://localhost:80/api/index.php";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "addUser",
                email: formData.email,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                address: fullAddress,
                password: formData.password,
            }),
        });
        try {
            const data = await response.json();
            if (data.status === "success") {
                navigate("/login");
            } else {
                navigate("/dashboard")
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to parse JSON response");
            console.error("Error parsing response:", error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                            </div>
                            <div>
                                <label className="block text-gray-600">Middle Name</label>
                                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div>
                            <label className="block text-gray-600">Street</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                        </div>
                        <div>
                            <label className="block text-gray-600">Apt/Lot #</label>
                            <input type="text" name="aptLot" value={formData.aptLot} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-600">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                            </div>
                            <div>
                                <label className="block text-gray-600">State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                            </div>
                            <div>
                                <label className="block text-gray-600">Zip Code</label>
                                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                                </button>
                            </div>
                            <div className="h-2 mt-2 w-full rounded bg-gray-200">
                                <div className={`h-full ${passwordStrength.color}`} style={{ width: `${passwordStrength.score}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{passwordStrength.level}</p>
                        </div>

                        <button type="submit" className="w-full bg-[#93E9BE] hover:bg-[#72c7a0] text-black font-bold py-2 px-4 rounded transition duration-200">Sign Up</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
