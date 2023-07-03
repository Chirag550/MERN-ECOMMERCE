import React, { useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard";
import { getProduct } from "../../REDUX/actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../REDUX/actions/ProductAction";

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
      <div className="banner">
        <p>Welcome to Online Shop</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </>
  );
};

export default Home;
