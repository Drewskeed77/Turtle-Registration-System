import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <div>
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <Link to="/dashboard">Go Back to Dashboard</Link>
        </div>
    );
};

export default UnauthorizedPage;
