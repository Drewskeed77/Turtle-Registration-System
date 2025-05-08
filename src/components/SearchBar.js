import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(query); // Pass query to parent component
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Search by keyword"
                    className="w-full py-2 pl-4 pr-12 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button type="submit" className="absolute right-2 text-gray-600">
                    <AiOutlineSearch size={24} />
                </button>
            </form>
        </div>
    );
}
