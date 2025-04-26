import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userAuthContext } from "../context/userAuthContext";

const NavBar = () => {
  const { user, logout } = useContext(userAuthContext);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          {" "}
          ChatApp{" "}
        </Link>{" "}
      </div>{" "}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {" "}
          {user ? (
            <>
              <li>
                {" "}
                <Link to="/"> Home </Link>
              </li>
              <li>
                {" "}
                <Link to="/profile"> Profile </Link>
              </li>
              <li>
                {" "}
                <Link to="/settings"> Settings </Link>
              </li>
              <li>
                <button onClick={logout}> Logout </button>{" "}
              </li>{" "}
            </>
          ) : (
            <>
              <li>
                {" "}
                <Link to="/login"> Login </Link>
              </li>
              <li>
                {" "}
                <Link to="/signup"> Sign Up </Link>
              </li>
            </>
          )}{" "}
        </ul>{" "}
      </div>{" "}
    </div>
  );
};

export default NavBar;
