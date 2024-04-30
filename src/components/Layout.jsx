import { Outlet,Link } from "react-router-dom";
import Contact from "./Contact";

// Component for navigating the different Web-Pages
const Layout = (props) => {

    return (
        <>
            <nav className="NavigationContainer">
                <h1 className="NavigationTitle">Navigation Bar</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="contact" element={<Contact></Contact>}>Contact</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    )

}
export default Layout;