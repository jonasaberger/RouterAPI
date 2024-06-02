import { Outlet,Link } from "react-router-dom";
import Spotify from "./Spotify";

// Component for navigating the different Web-Pages
const Layout = (props) => {

    return (
        <>
            <nav className="NavigationContainer">
                <h2 className="NavigationTitle">Navigation Bar</h2>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="spotify" element={<Spotify></Spotify>}>Spotify</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    )

}
export default Layout;