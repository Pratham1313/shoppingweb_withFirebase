import React, { useEffect } from "react";
import "../pages/cart.css";

export default function Cart({ cart, remove_cart }) {
  if (cart.length === 0) {
    return (
      <div>
        <h2 className="empty">Cart is Empty</h2>
      </div>
    );
  } else {
    let total = 0;
    let discount = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price * 70;
      discount = discount + cart[i].discountPercentage;
    }

    let save = (discount * total) / 100;
    let saved = Math.round(save);

    return (
      <div className="cart_and_checkout">
        <div className="carttt">
          {cart.map((item) => {
            return (
              <>
                <div className="productt">
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

                      <button onClick={() => remove_cart(item.id)}>
                        Remove{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="checkout">
          <h4>Checkout</h4>
          <div>
            {cart.map((item) => {
              return (
                <div className="price_name">
                  <p>
                    {item.title} (-{item.discountPercentage}%)
                  </p>
                  <p>₹{item.price * 70}</p>
                </div>
              );
            })}
            <div className="total">
              <h5>Total</h5>
              <h5>₹{total} /-</h5>
            </div>
            <h3>Saved ₹{saved}/-</h3>
            <button className="buy_button">Payment</button>
          </div>
        </div>
      </div>
    );
  }
}
