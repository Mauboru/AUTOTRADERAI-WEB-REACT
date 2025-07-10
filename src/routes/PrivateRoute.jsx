import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
        }
        setLoading(false);
    }, []);

    if (loading) return null;

    const role = user?.role;

    if (!token) return <Navigate to="/" replace />;

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
}
