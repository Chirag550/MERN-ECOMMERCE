import React from "react";
import "./Success.css";
import { MdCheckCircle } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <div className="OrderSuccess">
        <MdCheckCircle />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/order/me">View Orders</Link>
      </div>
    </>
  );
};

export default Success;
