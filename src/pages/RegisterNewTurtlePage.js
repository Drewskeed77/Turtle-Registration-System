import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCenter from "../components/AccountCenter";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

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
            const response = await fetch("http://localhost/api/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
        <>
            <Topbar children={<AccountCenter comp1={<Logout />} />} />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Register New Turtle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Species</label>
                            <input
                                type="text"
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Birth Date</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>


                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Register Turtle
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
