import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

import {
  OrderDetail,
  Updateorder,
  clearErrors,
} from "../../REDUX/actions/OrderAction";
import MetaData from "../Layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../REDUX/constants/orderConstant";
import "./UpdateOrder.css";
import { load } from "webfontloader";

const UpdateOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetail);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.AdminOrder
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(Updateorder(id, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(OrderDetail(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);
  if (loading) return <Loader />;
  return (
    <>
      <MetaData title="ADMIN- Update Order" />
      <div className="newProductContainer">
        <div
          className="confirmOrderPage"
          style={{
            display: order.orderStatus === "Delivered" ? "block" : "grid",
          }}
        >
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmShippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className="confirmShippingAreaBox">
                <div>
                  <p
                    style={{
                      color:
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "green"
                          : "red",
                    }}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="confirmShippingAreaBox">
                <div>
                  <p
                    style={{
                      color:
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "green"
                          : "red",
                    }}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="confirmCartItemsContainer">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmcartitemsbox">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div
            style={{
              display: order.orderStatus === "Delivered" ? "none" : "block",
            }}
          >
            <form
              className="updateOrderForm"
              onSubmit={updateOrderSubmitHandler}
            >
              <h1>Process Order</h1>

              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Choose Category</option>
                  {order.orderStatus === "processing" && (
                    <option value="Shipped">Shipped</option>
                  )}

                  {order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || status === "" ? true : false
                }
              >
                Process
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
