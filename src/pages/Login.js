import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./sslogin.css";
import { auth } from "../config/config";

export default function Login({ name, setname, setnavname }) {
  const [lemail, setlemail] = useState("");
  const [lpassword, setlpassword] = useState("");

  const navigate = useNavigate();

  async function signin(e) {
    e.preventDefault();
    toast("Wait");
    if (lemail === "" || lpassword === "") {
      return alert("Please fill all fields");
    }
    try {
      const users = await signInWithEmailAndPassword(auth, lemail, lpassword);
      const user = localStorage.setItem("user", JSON.stringify(users));
      toast.success("you are logging in", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 1500);

      setlemail("");
      setlpassword("");
    } catch (error) {
      toast.warning("Incorrect password");
    }
  }

  return (
    <>
      <div class="outerbox">
        <div class="innerbox">
          <header>Login</header>
          <form onSubmit={signin}>
            <div>
              <label for="email">Enter Email</label>
              <input
                value={lemail}
                onChange={(e) => setlemail(e.target.value)}
                id="email"
                placeholder="  Enter Mail id..."
                className="input_login"
                required
              />
            </div>
            <div>
              <label for="password">Enter Password</label>
              <input
                value={lpassword}
                onChange={(e) => setlpassword(e.target.value)}
                type="password"
                id="password"
                placeholder="  Enter password..."
                className="input_login"
                required
              />
            </div>
            <div>
              <button type="submit" id="create">
                Login
              </button>
            </div>
            <div>
              <label>Don't have account?</label>
              <Link to="/clogin">
                <label className="click_here">click here</label>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
