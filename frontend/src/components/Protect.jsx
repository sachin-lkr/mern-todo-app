import { Navigate } from "react-router-dom";

function Protect({ children }) {
  if(!localStorage.getItem("login")){
    return<Navigate to='/signup' replace/>
  }
  return children;
}

export default Protect;