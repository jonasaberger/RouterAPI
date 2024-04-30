import { Outlet,Link } from "react-router-dom";
import Contact from "./Contact";

// Component for navigating the different Web-Pages
const Layout = (props) => {

    return (
        <div>
            <h1>Navigation Bar</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="contact" element={<Contact></Contact>}>Contact</Link>
                </li>
            </ul>


            <div className="BodyContainer">
                <Outlet></Outlet>
            </div>
        </div>

    )

}
export default Layout;