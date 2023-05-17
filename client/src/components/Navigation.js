import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";


const Navigation = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    const logout = async () => {
        try {
            const response = await axios.get('/web/logout', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setAuth({});
            navigate('/login');

        } catch (error) {
            alert('Logout failed. Please try again later.');
        }
    }


    return (
        <div>
            <Link to="/">Home</Link><br></br>
            <Link to="/about">About</Link><br></br>
            <Link to="/NightlyRecharge">Nightly recharge</Link><br/>
            <Link to="/cardioload">Cardio load</Link><br/>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Navigation;