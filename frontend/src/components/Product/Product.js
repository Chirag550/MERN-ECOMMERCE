import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../REDUX/actions/ProductAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useLocation } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const routepath = useLocation();
  const [currentpage, setcurrentpage] = useState(1);
  const { products, error, loading, productsCount, resultperpage } =
    useSelector((state) => state.products);
  const { keyword } = useParams();
  console.log(keyword);
  const ontop = () => {
    window.scrollTo(0, 0);
  };
  console.log(resultperpage);
  console.log(productsCount);

  const setcurrentpageNO = (e) => {
    setcurrentpage(e);
  };
  useEffect(() => {
    ontop();
    dispatch(getProduct(keyword, currentpage));
  }, [dispatch, keyword, routepath, currentpage]);
  if (loading) return <Loader />;
  return (
    <>
      <h2 className="productheading">Products</h2>
      <div className="products">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
      {resultperpage < productsCount && (
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
