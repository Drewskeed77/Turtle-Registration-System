import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AccountCenter from "../components/AccountCenter";
import LoginBtn from "../components/LoginBtn";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function SignUpPage() {
    const navigate = useNavigate();

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
        address: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.firstName || !formData.password) {
            alert("Please fill in all required fields.");
            return;
        }

        // Concatenate the address before sending
        const fullAddress = `${formData.street}, ${formData.aptLot ? formData.aptLot + ', ' : ''}${formData.city}, ${formData.state} ${formData.zipCode}`;

        const apiUrl = "http://localhost/api/index.php"; 

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "addUser",
                email: formData.email,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                address: fullAddress,  // Use the concatenated address
                password: formData.password,
            }),
        });

        try {
            const data = await response.json();

            if (data.status === "success") {
                alert("User created successfully!");
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to parse JSON response");
            console.error("Error parsing response:", error);
        }
    };

    return (
        <>
            <Topbar children={<AccountCenter comp1={<LoginBtn />} />} />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                required
                            />
                        </div>

                        {/* Name Fields in a 3-Column Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600">Middle Name</label>
                                <input 
                                    type="text" 
                                    name="middleName" 
                                    value={formData.middleName} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-gray-600">Street</label>
                                <input 
                                    type="text" 
                                    name="street" 
                                    value={formData.street} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Apt/Lot #</label>
                                <input 
                                    type="text" 
                                    name="aptLot" 
                                    value={formData.aptLot} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">City</label>
                                <input 
                                    type="text" 
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">State</label>
                                <input 
                                    type="text" 
                                    name="state" 
                                    value={formData.state} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Zip Code</label>
                                <input 
                                    type="text" 
                                    name="zipCode" 
                                    value={formData.zipCode} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]"
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="w-full bg-[#93E9BE] hover:bg-[#72c7a0] text-black font-bold py-2 px-4 rounded transition duration-200"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-sm text-blue-500 hover:underline">
                            Already have an account? Log in
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
