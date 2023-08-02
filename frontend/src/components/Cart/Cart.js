import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ADDTOCART, REMOVECART } from "../../REDUX/actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import MetaData from "../Layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Cart = () => {
  const ontop = () => {
    window.scrollTo(0, 0);
  };
  const routepath = useLocation();
  const navigate = useNavigate();
  const { cartitems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const increaseqty = (id, quantity, stock) => {
    const newqty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(ADDTOCART(id, newqty));
  };
  const deleteCartItems = (id) => {
    dispatch(REMOVECART(id));
  };
  const decreaseqty = (id, quantity) => {
    const newqty = quantity - 1;
    if (1 >= quantity) return;

    dispatch(ADDTOCART(id, newqty));
  };

  const checkouthandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    ontop();
  }, [routepath]);
  return (
    <>
      <MetaData title="Shopping Cart" />
      {cartitems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="CART_PAGE">
          <div className="CART_HEADER">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartitems &&
            cartitems.map((item) => (
              <div className="CART_CONTAINER" key={item.product}>
                <CartItemCard item={item} deleteCartItem={deleteCartItems} />
                <div className="cardInput">
                  <button
                    onClick={() => decreaseqty(item.product, item.quantity)}
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseqty(item.product, item.quantity, item.Stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartsubtotal">{`$${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}
          <div></div>
          <div className="cartgrosstotal">
            <div></div>
            <div className="cartgrossbox">
              <p>Gross Total</p>
              <p>{`$${cartitems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkoutbtn">
              <button
                onClick={() => {
                  checkouthandler();
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
