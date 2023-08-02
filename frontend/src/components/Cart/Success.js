import React from "react";
import "./Success.css";
import { MdCheckCircle } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Success = () => {
  return (
    <>
      <MetaData title="Success" />
      <div className="OrderSuccess">
        <MdCheckCircle />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  );
};

export default Success;
