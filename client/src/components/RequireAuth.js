import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {  useEffect, useState } from "react";
import axios from "../api/axios";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        console.log('requireAuth: ', auth);
        if (!auth.user) {
            checkAuth();
        }
    }, [auth]);

    const checkAuth = async () => {
        try {
            const rsp = await axios.get('/auth', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            console.log(rsp);
            if (rsp.status === 200) {
                auth.user = rsp.data.x_user_id;
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        auth.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;