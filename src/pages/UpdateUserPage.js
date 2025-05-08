import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from '../components/Layout/Layout';

export default function UpdateUserPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        street: "",
        lotApt: "",
        city: "",
        state: "",
        zip: "",
        role_name: "",
    });

    useEffect(() => {
        if (location.state?.user) {
            const { email, fullName, role_name, address } = location.state.user;
            const nameParts = fullName.split(" ");
            const [street = "", lotApt = "", city = "", state = "", zip = ""] = address?.split(", ") || [];

            setFormData({
                email: email || "",
                firstName: nameParts[0] || "",
                middleName: nameParts.length === 3 ? nameParts[1] : "",
                lastName: nameParts.length === 3 ? nameParts[2] : nameParts[1] || "",
                street,
                lotApt,
                city,
                state,
                zip,
                role_name: role_name || "",
            });
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.firstName) {
            alert("Please fill in all required fields.");
            return;
        }

        const fullAddress = `${formData.street}, ${formData.lotApt}, ${formData.city}, ${formData.state}, ${formData.zip}`
            .trim()
            .replace(/,\s*,/g, ","); // Clean up empty fields

        try {
            const response = await fetch("http://localhost:80/api/index.php",   {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "updateUser",
                    email: formData.email,
                    firstName: formData.firstName,
                    middleName: formData.middleName,
                    lastName: formData.lastName,
                    address: fullAddress,
                    role_name: formData.role_name,
                }),
            });

            const data = await response.json();

            if (data.status === "success") {
                alert("User updated successfully!");
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to update user.");
            console.error("Error updating user:", error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Update User</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email (disabled) */}
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} disabled className="w-full p-2 border border-gray-300 rounded bg-gray-100" />
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                            <div>
                                <label className="block text-gray-600">Middle Name</label>
                                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-gray-600">Role</label>
                            <select name="role_name" value={formData.role_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]">
                                <option value="">Select Role</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Veterinarian">Veterinarian</option>
                            </select>
                        </div>

                        {/* Address Fields */}
                        <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                        <div>
                            <label className="block text-gray-600">Street</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-600">Lot/Apt # (Optional)</label>
                                <input type="text" name="lotApt" value={formData.lotApt} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                            <div>
                                <label className="block text-gray-600">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                            <div>
                                <label className="block text-gray-600">State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600">Zip Code</label>
                            <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-[#93E9BE]" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-[#93E9BE] hover:bg-[#72c7a0] text-black font-bold py-2 px-4 rounded transition duration-200">
                            Update User
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
