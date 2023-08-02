import React from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const ConfirmOrder = () => {
  const { cartitems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const address =
    shippingInfo.address +
    "." +
    shippingInfo.city +
    "," +
    shippingInfo.state +
    "," +
    shippingInfo.country +
    "," +
    shippingInfo.pinCode;

  const subtotal = cartitems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = 0.18 * subtotal;
  const totalPrice = subtotal + tax + shippingCharges;

  const ProceedToPayment = () => {
    const data = {
      subtotal,
      totalPrice,
      tax,
      shippingCharges,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItemsContainer">
            <Typography>Your Cart Items</Typography>
            <div className="confirmcartitemsbox">
              {cartitems &&
                cartitems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="item" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity}x ${item.price}= $
                      {item.price * item.quantity}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div className="orderSummaryContainer">
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummarytotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={ProceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
