import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20 , 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={product._id}>
      <img src={product[0].images[0].url} alt="product" />
      <p>{product[0].name}</p>
      <div>
        <ReactStars {...options} />
        <span>(256 reviews)</span>
      </div>
      <span>{product[0].price}</span>
    </Link>
  );
};

export default Product;
