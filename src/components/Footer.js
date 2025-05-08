import { Link } from "react-router-dom";


export default function Footer() {

    
    return (
        <div className=" w-full bg-[#4FA984] flex justify-evenly p-6 pb-12 text-white z-10">
            {/* Stay Connected Section */}
            <div>
                <h1 className="text-2xl font-semibold mb-2">Stay Connected</h1>
                <ul>
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a href="mailto:support@turtlesystem.com" className="hover:underline">
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a href="/newsletter" className="hover:underline">
                            Subscribe to Our Newsletter
                        </a>
                    </li>
                </ul>
            </div>

            {/* Committed To Section */}
            <div>
                <h1 className="text-2xl font-semibold mb-2">Committed To</h1>
                <ul>
                    <li>Educating Turtle Owners on Proper Care</li>
                    <li>Promoting Responsible Pet Ownership</li>
                    <li>Supporting Turtle Rescue & Rehabilitation</li>
                </ul>
            </div>

            {/* Navigation Section */}
            <div>
                <h1 className="text-2xl font-semibold mb-2">Navigate</h1>
                <ul>
                    <li><Link className="block hover:underline" to="/">Home</Link></li>
                    <li><Link className="block hover:underline" to="/sign-up">Sign Up</Link></li>
                    <li><Link className="block hover:underline" to="/login">Login</Link></li>
                    <li><Link className="block hover:underline" to="/dashboard">Dashboard</Link></li>

                </ul>
            </div>
        </div>
    );
}
