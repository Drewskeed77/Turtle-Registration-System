import AccountCenter from "../components/AccountCenter";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import RegisterTurtleBtn from "../components/RegisterTurtleBtn";
import Topbar from "../components/Topbar";

export default function UserDashboardPage() {
    return (
        <>
            <Topbar children={<AccountCenter comp1={<RegisterTurtleBtn />} comp2={<Logout />} />} />
            <Dashboard />
            <Footer />
        </>
    )
}