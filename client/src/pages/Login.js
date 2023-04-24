import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../App.js';
import '../css/login.css'

import axios from '../api/axios.js';
import useAuth from '../hooks/useAuth.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const LOGIN_URL = '/login';

const clientID = '642a3448-e7fc-4dff-9ef6-f0701ccdee91';
const polarAuthLink = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientID}`;

function Login() {
    const [loading, setLoading] = React.useState(false);
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');


    const handleClick = (e) => {
        // set timeout
        e.preventDefault();
        setLoading(true);
        setTimeout(async () => {
            window.location.href = polarAuthLink;
        }, 1000);
    };

    useEffect(() => {

    });

    const handleLogin = (accessObject) => {
        setAuth({ user: accessObject.x_user_id });
        navigate(from, { replace: true });
    }

    const devLogin = async () => {
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user: 'admin', pwd: 'admin' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            handleLogin(response.data);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='App' style={{ display: 'flex' }} >
            <div className='overlay'>
                <div className='login'>
                    <h1 style={{ margin: 'auto' }}>polar API</h1>
                    {errMsg ? <p className='errMsg' ref={errRef} tabIndex='-2' style={{ color: 'red' }}>{errMsg}</p> : null}
                    {process.env.NODE_ENV === 'development' ? <button onClick={devLogin}>Dev log in</button> : null}
                    <div className='buttonDiv'>
                        <a href={polarAuthLink}>
                            <LoadingButton
                                onClick={handleClick}
                                loading={loading}
                                loadingIndicator=<span style={{ color: 'white' }}>Redirecting... <CircularProgress size={16} /> </span>
                                variant="contained"
                            >
                                <span>Log in with Polar account</span>
                            </LoadingButton>
                        </a>
                        <a href='/polar-API/about'><Button variant="contained">About</Button></a>
                        <a href='https://github.com/jannejki/polar-API'><Button variant="contained">Repository<GitHubIcon></GitHubIcon></Button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;