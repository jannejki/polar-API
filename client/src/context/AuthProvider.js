import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
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

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;