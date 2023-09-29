import React from "react";
import "./navbar.css";
import logo_icon from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ cart, name, login }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  function handle_logout() {
    localStorage.clear("user");
    toast.success("Logged Out");
    navigate("/login");
  }
  return (
    <>
      <div className="nav">
        <div className="logo_and_search">
          <img src={logo_icon} alt="" className="logo" />
        </div>
        <div className="pages">
          {user && <p className="user_namee">{user.user.email}</p>}
          {user && (
            <Link to="/">
              <button>Shop</button>
            </Link>
          )}
          {user && (
            <Link to="/cart">
              <button className="cartt">🛒Cart - {`${cart.length}`} </button>
            </Link>
          )}
          {user && (
            <Link to="/order's">
              <button>Order's</button>
            </Link>
          )}
          {user && <button onClick={handle_logout}>Logout</button>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
