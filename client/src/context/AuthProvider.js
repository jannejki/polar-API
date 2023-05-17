import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    useEffect(() => {
    }, []);

    const checkAuth = async () => {
        try {
            const rsp = await axios.get('/web/auth', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (rsp.status === 200) {
                auth.user = true;
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
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

            setLoading(false);

            if (response.status === 200) {
                // set cookie token to setAuth and navigate to home
                setAuth({ user: true });
                // navigate to home
                window.location.href = '/polar-API';
            }
        } catch (error) {
            // setError(error);
            console.log(error);
        } 
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkAuth, polarLogin }}>
            {loading ? <h1>Loading</h1> : children}
        </AuthContext.Provider>
    )
}

export default AuthContext;