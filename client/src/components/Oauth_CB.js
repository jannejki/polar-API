import React, { useEffect, useRef, useState } from 'react';
import '../App.js';
import '../css/login.css'

import axios from '../api/axios';
import useAuth from '../hooks/useAuth.js';
import { useLocation, useNavigate } from 'react-router-dom';

function Oauth_CB() {
    const { setAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/polar-API";


    useEffect(() => {
        // get the code from url
        setError(undefined);
        const url = window.location.href;
        const code = url.split('=')[1];
        if(code) {
            polarLogin(code);
        } else {
            alert('Something went wrong! Please try again later');
        }
    }, []);

    const handleLogin = (accessObject) => {
        setAuth({ user: true });
        navigate(from, { replace: true });
    }

    const polarLogin = async (code) => {
        try {
            setLoading(true);

            const response = await axios.get(`/web/oauth2_callback?code=${code}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 200) {
                // set cookie token to setAuth and navigate to home
                setAuth({ user: true });
                // navigate to home
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    return (
        <div className="login" style={{ margin: 'auto' }}>
            {error
                ? <div>
                    <h1 style={{ color: 'black' }}>Something went wrong</h1>
                    <h2>{error.message}</h2>
                    {error.response ? <div><h3> http status: {error.response.status}</h3><p>{error.response?.data}</p></div> : null}
                    {error.response?.status.toString().startsWith('5') ? <p> Try again later</p> : null}
                </div>
                : <h1 style={{ color: 'black' }}>Logging in...</h1>
            }
        </div>
    )
}

export default Oauth_CB;