import { Outlet } from "react-router-dom"
import axios from "../api/axios";

const authTester = async () => {
    try {
        const response = await axios.get('/web/auth', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
    } catch (error) {
        console.log(error);
    }
}

const Layout = () => {
    return (
        <main className="App">
            {process.env.NODE_ENV === 'development'
                ? <div>
                    <button onClick={authTester}>auth tester</button>
                </div>
                : null
            }
            <Outlet />
        </main>
    )
}

export default Layout
