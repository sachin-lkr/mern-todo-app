import { Link, Navigate, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate();
  useEffect(() => {
    const handelStorage = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localStorage-change", localStorage);
    return () => {
      window.removeEventListener("localStorage-change", localStorage);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(null)
   setTimeout(()=>{
     navigate("/signin");
   },0);
  };
  return (
    <nav className="navbar">
      <div className="logo">To-Do App</div>
      <ul className="nav-links">
        {login ? (
          <>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/add">Add Task</Link>
            </li>
            <li>
              <Link onClick={logout}>Log_out</Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};
