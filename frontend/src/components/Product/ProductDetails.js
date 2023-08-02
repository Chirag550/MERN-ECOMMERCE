import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createReview,
  getProductDetails,
} from "../../REDUX/actions/ProductAction";
import { useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";

import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { ADDTOCART } from "../../REDUX/actions/cartAction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../REDUX/constants/productConstants";
const ProductDetails = () => {
  const dispatch = useDispatch();

  const routepath = useLocation();

  const ontop = () => {
    window.scrollTo(0, 0);
  };

  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.createReview
  );

  const [quantity, setquantity] = useState(1);
  const [rating, setratings] = useState(0);
  const [open, setopen] = useState(false);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setopen(false) : setopen(true);
  };

  const increaseqty = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setquantity(qty);
  };
  const decreaseqty = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setquantity(qty);
  };

  useEffect(() => {
    ontop();

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Succesfuly");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, routepath, success, reviewError]);

  const addtocarthandler = () => {
    dispatch(ADDTOCART(id, quantity));
    alert.success("Item Added To Cart");
  };

  const options = {
    readOnly: true,

    size: "Large",
    value: product.ratings,
    precison: 0.5,
  };
  const reviewsubmithandler = () => {
    const myform = new FormData();

    myform.set("rating", rating);
    myform.set("comment", comment);
    myform.set("productid", id);

    dispatch(createReview(myform));
    setopen(false);
  };

  if (loading) return <Loader />;
  return (
    <>
      <MetaData title={`${product.name} -- ONLINE SHOP`} />
      <div className="ProductDetails">
        <div>
          <Carousel className="carousel">
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="DetailsBlock-1">
            <h2 className="h2">{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="DetailsBlock-2">
            <Rating {...options} />
            <span DetailsBlock-2-span>({product.numofReviews} Reviews)</span>
          </div>
          <div className="DetailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="DetailsBlock-3-1">
              <div className="DetailsBlock-3-1-1">
                <button onClick={decreaseqty}>-</button>
                <input type="number" readOnly value={quantity} />
                <button onClick={increaseqty}>+</button>
              </div>
              <button
                disabled={product.Stock < 1 ? true : false}
                onClick={addtocarthandler}
              >
                Add to Cart
              </button>
            </div>
            <p>
              Status:
              <b className={product.Stock < 1 ? "redcolor" : "greencolor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="DetailsBlock-4">
            Description:<p>{product.description}</p>
          </div>
          <button onClick={(e) => setopen(true)} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={submitReviewToggle}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setratings(e.target.value)}
            value={rating}
            size="large"
          />
          <textarea
            className="submitDialogtextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={submitReviewToggle}>
            Cancel
          </Button>
          <Button onClick={reviewsubmithandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <h3 className="reviewHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => <ReviewCard review={review} />)}
        </div>
      ) : (
        <p className="noReviews">No Reviews</p>
      )}
    </>
  );
};

export default ProductDetails;
