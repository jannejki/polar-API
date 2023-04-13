import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/login');
    }

    return (
        <div>
            <Link to="/">Home</Link><br></br>
            <Link to="/about">About</Link><br></br>
            <Link to="/NightlyRecharge">Nightly recharge</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
            <h1>Home</h1>

        </div>
    )
}

export default Home;
