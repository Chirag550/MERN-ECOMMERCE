import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../REDUX/actions/ProductAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import Slider from "@mui/material-next/Slider";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { clearErrors } from "../../REDUX/actions/ProductAction";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Product = () => {
  const dispatch = useDispatch();
  const routepath = useLocation();
  const [currentpage, setcurrentpage] = useState(1);
  const [price, setPrice] = useState([0, 2500000]);
  const [category, setCategory] = useState("");
  const [ratings, setratings] = useState(0);
  const Alert = useAlert();
  const {
    products,
    error,
    loading,
    productsCount,
    resultperpage,
    filteredCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();

  const ontop = () => {
    window.scrollTo(0, 0);
  };

  const setcurrentpageNO = (e) => {
    setcurrentpage(e);
  };
  const pricehandler = (event, newPrice) => {
    setTimeout(() => {
      setPrice(newPrice);
    }, 1000);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    ontop();
    dispatch(getProduct(keyword, currentpage, price, category, ratings));
  }, [dispatch, keyword, routepath, currentpage, price, category, ratings]);
  if (loading) return <Loader />;
  return (
    <>
      <MetaData title="PRODUCTS -- ONLINE SHOP" />
      <h2 className="productheading">Products</h2>
      <div className="products">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
      {/* //filteration price slider */}
      <div className="filterbox">
        <Typography>Price</Typography>
        <Slider
          max={25000}
          min={0}
          value={price}
          onChange={pricehandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Typography>Categories</Typography>
        <ul className="categorybox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            max={5}
            className="slider"
            min={0}
            value={ratings}
            onChange={(e, newRating) => {
              setratings(newRating);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="continous-slider"
          />
        </fieldset>
      </div>
      {resultperpage < filteredCount && (
        <div className="paginationbox">
          <Pagination
            activePage={currentpage}
            itemsCountPerPage={resultperpage}
            totalItemsCount={productsCount}
            onChange={setcurrentpageNO}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="Ist"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageitemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default Product;
