import { Outlet } from "react-router-dom"
import { useContext } from "react";
import Navigation from "../components/Navigation";
import AuthContext from "../context/AuthProvider";

const Layout = () => {
    const { auth } = useContext(AuthContext);

    return (
        <main className="App d-flex flex-column px-0">
            {auth.user
                ? <Navigation />
                : null
            }
            <Outlet />
        </main>
    )
}

export default Layout
