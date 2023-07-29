import React from "react";
import { Rating } from "@mui/material";
import ProfilePng from "../../assets/Profile.png";
import "./ProductDetails.css";

const ReviewCard = ({ review }) => {
  const options = {
    readOnly: true,

    size: "Large",
    value: review.rating,
    precison: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={ProfilePng} alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewcardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
