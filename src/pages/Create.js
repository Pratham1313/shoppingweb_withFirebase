import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sslogin.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";

export default function CreateAccount({ name, setname, setnavname }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function Create_login(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast("Please complete the form");
    }
    toast("Wait");
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Acoount created");
      setemail("");
      setpassword("");
    } catch (error) {
      console.log(error);
      toast.warning("Account already exists");
    }
  }

  return (
    <>
      <div class="outerbox">
        <div class="innerbox">
          <header>Create New Account</header>
          <form onSubmit={Create_login}>
            <div>
              <label for="email">Enter Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                id="email"
                placeholder="  Enter Mail id..."
                className="input_login"
                required
              />
            </div>
            <div>
              <label for="password">Enter Password</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                id="password"
                placeholder="  Minimum 6 digits..."
                className="input_login"
                required
              />
            </div>
            <div>
              <button type="submit" id="create">
                create account
              </button>
            </div>
            <div>
              <label>Already have account?</label>
              <Link to="/login">
                <label className="click_here">click here</label>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
    </>
  );
}
