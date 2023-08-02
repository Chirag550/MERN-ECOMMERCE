import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <>
      <div className="cartitemcard">
        <img src={item.image} alt="Product" />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ${item.price}`}</span>
          <p onClick={() => deleteCartItem(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
