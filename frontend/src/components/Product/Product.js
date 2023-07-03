import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../REDUX/actions/ProductAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Layout/Loader/Loader";
import { useParams } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productsCount } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();
  console.log(keyword);
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
  if (loading) return <Loader />;
  return (
    <>
      <h2 className="productheading">Products</h2>
      <div className="products">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
    </>
  );
};

export default Product;
