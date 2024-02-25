// create a file (e.g privateRoute.js) write this code
import { Navigate, Outlet } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useIdle } from "../../hooks/useIdle";


const ProtectedRoutes = () => {
  const isToken = localStorage.getItem('session_token')
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  };

  const {isIdle} = useIdle({onIdle: handleLogout, idleTime: 30})

  return (
    <>
    { isToken ? <Outlet /> : <Navigate to="/login" /> || 
      isIdle ? <Navigate to="/login" /> : <Outlet /> 
    }
    </>
    )
};

export default ProtectedRoutes;