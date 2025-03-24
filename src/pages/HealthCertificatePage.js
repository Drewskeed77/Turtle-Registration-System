import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import AccountCenter from "../components/AccountCenter";
import Logout from "../components/Logout";

export default function HealthCertificatePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { turtle } = location.state || {};

    const [formData, setFormData] = useState({
        ownerName: "",
        ownerAddress: "",
        ownerEmail: "",
        vetName: "",
        vetLicense: "",
        healthStatus: "",
        medicalConditions: "",
        treatment: "",
        dateIssued: "",
        additionalNotes: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Health Certificate Data Submitted:", formData);
        alert("Health Certificate Issued Successfully!");
        navigate("/admin-dashboard");
    };

    return (
        <div>
            <Topbar children={<AccountCenter comp1={< Logout />} />}/>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg my-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Health Certificate</h2>
            <p className="text-lg font-semibold text-gray-700 mb-4">For: {turtle?.name} | Species: {turtle?.species} | Age: {turtle?.age}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Information */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-gray-700 px-2">Owner Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="ownerEmail"
                                value={formData.ownerEmail}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="ownerAddress"
                                value={formData.ownerAddress}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Veterinarian Information */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-gray-700 px-2">Veterinarian Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Veterinarian Name</label>
                            <input
                                type="text"
                                name="vetName"
                                value={formData.vetName}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">License Number</label>
                            <input
                                type="text"
                                name="vetLicense"
                                value={formData.vetLicense}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Health Information */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-gray-700 px-2">Health Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700">Health Status</label>
                            <input
                                type="text"
                                name="healthStatus"
                                value={formData.healthStatus}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Medical Conditions</label>
                            <input
                                type="text"
                                name="medicalConditions"
                                value={formData.medicalConditions}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Treatment</label>
                            <input
                                type="text"
                                name="treatment"
                                value={formData.treatment}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Additional Notes */}
                <div>
                    <label className="block text-gray-700">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows="3"
                    />
                </div>

                {/* Date and Submit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Date Issued</label>
                        <input
                            type="date"
                            name="dateIssued"
                            value={formData.dateIssued}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">
                            Issue Certificate
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    );
}
