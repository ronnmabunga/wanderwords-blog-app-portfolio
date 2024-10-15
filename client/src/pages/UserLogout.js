import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SessionContext from "../context/SessionContext";
export default function UserLogout() {
    const { setIsLoggedIn, setUser } = useContext(SessionContext);
    localStorage.removeItem("token");
    useEffect(() => {
        setIsLoggedIn(false);
        setUser(null);
    }, [setIsLoggedIn]);
    return <Navigate to="/login" />;
}
