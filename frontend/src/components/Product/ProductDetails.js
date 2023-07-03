import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../REDUX/actions/ProductAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const routepath = useLocation();

  const ontop = () => {
    window.scrollTo(0, 0);
  };

  let { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    ontop();
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, routepath]);

  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20 , 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  if (loading) return <Loader />;
  return (
    <>
      <div className="ProductDetails">
        <div className="product">
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
            <ReactStars {...options} />
            <span>({product.numofReviews} reviews)</span>
          </div>
          <div className="DetailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="DetailsBlock-3-1">
              <div className="DetailsBlock-3-1-1">
                <button>-</button>
                <input type="number" value="1" />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
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
          <button className="submitReview">Submit Review</button>
        </div>
      </div>

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
