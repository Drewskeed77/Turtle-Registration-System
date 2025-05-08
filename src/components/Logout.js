
export default function Logout() {
    const handleLogout = () => {
        window.location.href = "/"; // Redirect to home after logout
    };

    return (
        <button className="px-4 py-2 bg-[#93E9BE] text-black rounded" onClick={handleLogout}>
            Logout
        </button>
    );
}
