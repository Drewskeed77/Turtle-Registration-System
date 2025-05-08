import logo from "../../src/logo.jpg";
import { Link } from "react-router-dom";

export default function TurtleCard({ turtle }) {
    // Health status color mapping
    const getHealthColor = (status) => {
        if (!status) return 'bg-gray-300';
        const statusLower = status.toLowerCase();
        if (statusLower.includes('excellent')) return 'bg-green-500';
        if (statusLower.includes('good')) return 'bg-blue-500';
        if (statusLower.includes('fair') || statusLower.includes('stable')) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'No health records';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-6 my-4 mx-auto border">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Image */}
                <img
                    src={logo}
                    alt="Turtle Logo"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                />
                
                {/* Text Content */}
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-xl font-semibold">{turtle.name}</h2>
                    <p className="text-gray-600">Species: {turtle.species}</p>
                    <p className="text-gray-600">Age: {turtle.age} years</p>
                    <p className="text-gray-600">Gender: {turtle.gender}</p>
                    
                    {/* Health Status */}
                    <div className="mt-2 flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getHealthColor(turtle.health_status)}`}></span>
                        <span className="text-gray-600">
                            Health: {turtle.health_status || 'Not assessed'}
                        </span>
                    </div>
                    
                    {turtle.last_health_check && (
                        <p className="text-gray-600">Last check: {formatDate(turtle.last_health_check)}</p>
                    )}
                    {turtle.vet_name && (
                        <p className="text-gray-600">Vet: {turtle.vet_name}</p>
                    )}
                    
                    <p className="text-gray-400">Updated at: {new Date(turtle.updated_at).toLocaleDateString()}</p>
                    <p className="text-gray-600">Owner: {turtle.owner_name}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4">
                <Link 
                    to={"/health-certificate"} 
                    state={{ turtle }} 
                    className="px-4 py-2 bg-[#93E9BE] text-black rounded-md hover:bg-[#84d1ab] text-center"
                >
                    {turtle.health_status ? 'Update Health Certificate' : 'Add Health Certificate'}
                </Link>
                <Link 
                    to={"/update-turtle"} 
                    state={{ turtle }} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                >
                    Update
                </Link>
            </div>
        </div>
    );
}