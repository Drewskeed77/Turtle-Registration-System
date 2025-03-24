import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
            const { email, fullName, role_name, address, ...rest } = location.state.user;
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

        const fullAddress = `${formData.street}, ${formData.lotApt}, ${formData.city}, ${formData.state}, ${formData.zip}`.trim().replace(/,\s*,/g, ","); // Clean up empty fields

        try {
            const response = await fetch("http://localhost/api/index.php", {
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
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} disabled className="w-full border p-2 rounded bg-gray-100" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Middle Name</label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select name="role_name" value={formData.role_name} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="">Select Role</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Vet">Veterinarian</option>
                    </select>
                </div>

                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Street</label>
                    <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Lot/Apt # (Optional)</label>
                        <input type="text" name="lotApt" value={formData.lotApt} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Zip Code</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover: bg-blue-600">
                    Update User
                </button>
            </form>
        </div>
    );
}
