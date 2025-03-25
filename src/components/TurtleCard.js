import logo from "../../src/logo.jpg";
import { Link } from "react-router-dom";

export default function TurtleCard({ turtle }) {
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
                    <p className="text-gray-400">Updated at: {turtle.updated_at}</p>
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
                    Health Certificate
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
