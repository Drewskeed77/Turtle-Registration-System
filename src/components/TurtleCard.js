import logo from "../../src/logo.jpg";
import { Link } from "react-router-dom";

export default function TurtleCard({ turtle }) {
    return (
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 my-4 mx-auto border">
            <div className="flex items-center mb-4">
                <img src={logo} alt="Turtle Logo" className="w-96 h-96 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-semibold">{turtle.name}</h2>
                    <p className="text-gray-600">Species: {turtle.species}</p>
                    <p className="text-gray-500">Age: {turtle.age} years</p>
                    <p className="text-gray-400">Gender: {turtle.gender}</p>
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <Link 
                    to={"/health-certificate"} 
                    state={{ turtle }} 
                    className="px-4 py-2 bg-[#93E9BE] text-black rounded-md hover:bg-[#84d1ab]"
                >
                    Health Certificate
                </Link>
                <Link 
                    to={"/update-turtle"} 
                    state={{ turtle }} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Update
                </Link>
            </div>
        </div>
    );
}
