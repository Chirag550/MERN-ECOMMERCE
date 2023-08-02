import React, { useEffect } from "react";
import "./Home.css";

import { getProduct } from "../../REDUX/actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../REDUX/actions/ProductAction";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    console.log(dispatch);
  }, [dispatch, error, alert]);

  if (loading) return <Loader />;
  return (
    <>
      <MetaData title={"Ecommerce"} />
      <div className="banner">
        <p>Welcome to Online Shop</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
