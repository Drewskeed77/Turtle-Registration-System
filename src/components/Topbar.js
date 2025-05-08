import { Link } from "react-router-dom";
import AccountCenter from "./AccountCenter";
import logo from "../logo.png"

export default function Topbar() {
    return (
        <div className="w-full bg-[#4FA984] flex justify-between items-center p-4 text-white shadow-md">
            {/* Logo as an Image Link */}
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Turtle System Logo" className="h-10 w-auto" />
            </Link>

            {/* Account Center (Login/Logout) */}
            <AccountCenter />
        </div>
    );
}
