import Backdrop from "../components/Backdrop";
import Topbar from "../components/Topbar";
import AccountCenter from "../components/AccountCenter";
import SignUpBtn from "../components/SignUpBtn";
import LoginBtn from "../components/LoginBtn";
import Footer from "../components/Footer"
export default function Home() {
    return (
        <>
        <Topbar children={<AccountCenter comp1={<SignUpBtn />} comp2={<LoginBtn />} />} />
        < Backdrop />
        < Footer />
        </>
    )
}