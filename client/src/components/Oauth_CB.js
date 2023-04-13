import React, { useEffect, useRef, useState } from 'react';
import '../App.js';
import '../css/login.css'

import axios from '../api/axios';
import useAuth from '../hooks/useAuth.js';
import { useLocation, useNavigate } from 'react-router-dom';
const LOGIN_URL = '/login';

const clientID = '642a3448-e7fc-4dff-9ef6-f0701ccdee91';
const polarAuthLink = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientID}`;

function Oauth_CB() {
    const { setAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log('received code: ', code);
        polarLogin(code);
    }, []);

    const handleLogin = (accessObject) => {
        console.log(accessObject);
        setAuth({ user: accessObject.x_user_id });

        navigate(from, { replace: true });
    }

    const polarLogin = async (code) => {
        try {
            setLoading(true);
            const response = await axios.get(`/oauth2_callback?code=${code}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log('response received from server');
            handleLogin(response.data);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <div className="login" style={{margin:'auto'}}>
            <h1>Logging in...</h1>
        </div>
    )
}

export default Oauth_CB;