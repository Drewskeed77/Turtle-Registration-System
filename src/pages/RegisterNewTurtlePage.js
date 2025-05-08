import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function RegisterNewTurtlePage() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user")); // Get logged-in user

    const [formData, setFormData] = useState({
        name: "",
        species: "",
        birth_date: "",
        gender: "",
        image: "",
        health_cert: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("User not logged in!");
            return;
        }

        try {
            const response = await fetch("http://localhost:80/api/index.php",   {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "addTurtle",
                    owner_id: user.user_id,
                    name: formData.name,
                    species: formData.species,
                    birth_date: formData.birth_date,
                    gender: formData.gender,
                    image: formData.image,
                    health_cert: formData.health_cert,
                }),
            });

            const data = await response.json();

            if (data.status === "success") {
                alert("Turtle registered successfully!");
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to register turtle.");
            console.error("Error registering turtle:", error);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register New Turtle</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Species */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#4FA984] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Species</label>
                            <input
                                type="text"
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#4FA984] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Birth Date & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium">Birth Date</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#4FA984] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#4FA984] focus:outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#4FA984] focus:outline-none bg-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4FA984] file:text-white hover:file:bg-green-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="w-full md:w-auto bg-[#93E9BE] hover:bg-[#72c7a0] text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Register Turtle
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
