import { Rating } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const options = {
    readOnly: true,

    size: "Large",
    value: product.ratings,
    precison: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="product" />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCard-div-span">
          ({product.numofReviews} reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
