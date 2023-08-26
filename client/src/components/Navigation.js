import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';


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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container d-flex flex-row">
                <div className='row m-auto'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <a className="navbar-brand" href="#">Menu</a>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navbar-content'>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/about">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Data
                                </a>
                                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                    <li><a className='nav-link dropdown-item' href="#/NightlyRecharge">Nightly recharge</a></li>
                                    <li><a className='nav-link dropdown-item' href="#/cardioload">Cardio load</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/settings">Settings</a>
                            </li>
                            <li className="nav-item">
                                <Button className='btn btn-success' onClick={logout} variant="contained" color="error"><LogoutIcon /></Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;