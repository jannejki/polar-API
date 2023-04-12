import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../App.js';
import '../css/login.css'

function Login(props) {
    const [loading, setLoading] = React.useState(false);
    const handleClick = () => {
        setLoading(true);
    };

    return (
            <div className='App' style={{ display: 'flex' }} >
                <div className='overlay'>
                    <div className='login'>
                        <h1 style={{ margin: 'auto' }}>polar API</h1>
                        <div className='buttonDiv'>
                            <a href={`https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${props.clientID}`}>
                                <LoadingButton
                                    onClick={handleClick}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                >
                                    <span>Log in with Polar account</span>

                                </LoadingButton>
                            </a>
                            <a href='/about'><Button variant="contained">About</Button></a>
                            <a href='https://github.com/jannejki/polar-API'><Button variant="contained">Repository<GitHubIcon></GitHubIcon></Button></a>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Login;