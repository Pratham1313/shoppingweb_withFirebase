import "./styles.css";
import "./component/navbar.js";
import Navbar from "./component/navbar.js";
import Home from "./pages/home.js";
import Cart from "./pages/cart.js";
import CreateAccount from "./pages/Create";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AppUser from "./context/AppContext";
import { ProtectedRoute } from "./protectedroute/protectedroute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";
import { fireDB } from "./config/config";
import Order from "./pages/delivery";

export default function App() {
  const [product, setproduct] = useState([]);
  const [cart, Setcart] = useState([]);
  const [name, setname] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  let collection_name;

  user ? (collection_name = user.user.uid) : (collection_name = "product");

  const productRef = collection(fireDB, collection_name);
  useEffect(() => {
    async function get_data() {
      const dbvalue = await getDocs(productRef);
      Setcart(dbvalue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    get_data();
  });

  async function add_cartt(item) {
    collection_name = user.user.uid;
    toast.success("Added", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    try {
      await addDoc(productRef, item);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove_cart(id) {
    collection_name = user.user.uid;
    toast.success("Removed", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    const deleteval = doc(fireDB, collection_name, id);
    await deleteDoc(deleteval);
  }

  function payment() {}

  return (
    <>
      <AppUser.Provider value={{ product, setproduct, cart, Setcart }}>
        <BrowserRouter>
          <Navbar cart={cart} name={name} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home
                    product={product}
                    setproduct={setproduct}
                    add_cartt={add_cartt}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} remove_cart={remove_cart} payment={payment} />
              }
            />
            <Route
              path="/clogin"
              element={<CreateAccount name={name} setname={setname} />}
            />
            <Route path="/login" element={<Login name={name} />} />
            <Route path="/order's" element={<Order />} />
          </Routes>
        </BrowserRouter>
      </AppUser.Provider>
    </>
  );
}
