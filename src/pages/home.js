import React, { useEffect, useState } from "react";
import "./home.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ product, setproduct, add_cartt }) {
  const [searchvalue, setsearchvalue] = useState("");

  useEffect(() => {
    productdata();
  }, []);

  async function productdata() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setproduct(data.products);
    console.log(product);
  }

  async function handle_search() {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchvalue}`
    );
    const data = await response.json();
    setproduct(data.products);
    console.log(product);
  }

  return (
    <>
      <div className="home">
        <div className="search_bar">
          <input
            type="search"
            placeholder="search products"
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
          />
          <button className="sbutton" onClick={handle_search}>
            search
          </button>
        </div>

        <div className="all_products">
          {product.map((item) => {
            return (
              <>
                <div className="product">
                  <img src={item.thumbnail} alt="" className="productimage" />
                  <div className="dataa">
                    <div>
                      <h2>{item.title}</h2>
                      <h5>
                        ★{item.rating}({item.stock})
                      </h5>
                      <p className="desc">{item.description}</p>
                    </div>
                    <div className="price_p">
                      <h4>
                        Price:₹{item.price * 70} (
                        {Math.round(item.discountPercentage)}%off)
                      </h4>

                      <button onClick={() => add_cartt(item)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
