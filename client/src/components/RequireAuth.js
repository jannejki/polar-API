import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";


const RequireAuth = () => {
    const { auth, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!auth.user) {
            checkAuth();
        } else {

        }
    }, [auth]);

    return (
        auth.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;