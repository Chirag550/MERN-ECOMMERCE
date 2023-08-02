import React from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import axios from "axios";
import "./Payment.css";
import { MdCreditCard } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { NewOrder, clearErrors } from "../../REDUX/actions/OrderAction";

const Payment = () => {
  const orderinfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paybtn = useRef(null);
  const dispatch = useDispatch();
  const { shippingInfo, cartitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const elements = useElements();
  const navigate = useNavigate();
  const stripe = useStripe();
  const alert = useAlert();
  const { error } = useSelector((state) => state.neworder);
  const paymentData = {
    amount: Math.round(orderinfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartitems,

    itemsPrice: orderinfo.subtotal,
    taxPrice: orderinfo.tax,

    shippingPrice: orderinfo.shippingCharges,
    totalPrice: orderinfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    paybtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe && !elements) return;
      console.log(client_secret);

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        paybtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(NewOrder(order));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      paybtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);
  return (
    <>
      <MetaData title="ONLINE SHOP-Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <MdCreditCard />
            <CardNumberElement className="paymentinput" />
          </div>
          <div>
            <MdEvent />
            <CardExpiryElement className="paymentinput" />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className="paymentinput" />
          </div>

          <input
            type="submit"
            value={`Pay - ${orderinfo && orderinfo.totalPrice}`}
            ref={paybtn}
            className="paymentformbtn"
          ></input>
        </form>
      </div>
    </>
  );
};

export default Payment;
