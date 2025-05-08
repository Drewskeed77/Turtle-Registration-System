import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from '../components/Layout/Layout';

export default function UpdateTurtlePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const turtleData = location.state?.turtle || {};

    const [formData, setFormData] = useState({
        turtle_id: turtleData.turtle_id || "",
        name: turtleData.name || "",
        species: turtleData.species || "",
        birth_date: turtleData.birth_date || "",
        gender: turtleData.gender || "",
        image: turtleData.image || "",
        health_cert: turtleData.health_cert || "",
    });

    useEffect(() => {
        if (location.state?.turtle) {
            setFormData({
                turtle_id: turtleData.turtle_id || "",
                name: turtleData.name || "",
                species: turtleData.species || "",
                birth_date: turtleData.birth_date || "",
                gender: turtleData.gender || "",
                image: turtleData.image || "",
                health_cert: turtleData.health_cert || "",
            });
        }
    }, [turtleData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result, // Store Base64 string
                }));
            };

            reader.readAsDataURL(file); // Convert file to Base64
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:80/api/index.php",   {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "uploadTurtleImage",
                    turtle_id: formData.turtle_id,
                    name: formData.name,
                    species: formData.species,
                    birth_date: formData.birth_date,
                    gender: formData.gender,
                    image: formData.image, // Send Base64 string
                }),
            });

            const data = await response.json();

            if (data.status === "success") {
                sessionStorage.setItem("turtle", JSON.stringify(data.turtle));
                navigate("/dashboard");
            } else {
                alert(data.message || "Update failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg my-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Turtle Information</h2>
                <form onSubmit={handleSubmit}>
                    {/* Three-Column Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700">Turtle Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Species</label>
                            <input
                                type="text"
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Birth Date</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>
                    </div>

                    {/* Two-Column Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 mt-6 rounded hover:bg-blue-600">
                        Update Turtle
                    </button>
                </form>
            </div>
        </Layout>
    );
}
