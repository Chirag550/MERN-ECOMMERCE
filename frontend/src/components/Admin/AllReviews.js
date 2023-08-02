import React from "react";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import "./AllReviews.css";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../../REDUX/actions/ProductAction";
import { DELETE_REVIEW_RESET } from "../../REDUX/constants/productConstants";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
const AllReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const [productId, setProductId] = useState("");
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row["rating"] >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.row["id"])}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  if (loading) return <Loader />;

  return (
    <>
      <MetaData title="ADMIN- Product Reviews" />
      <div className="productReviewsContainer">
        <form
          className="productReviewsForm"
          onSubmit={productReviewsSubmitHandler}
        >
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

          <div>
            <Star />
            <input
              type="text"
              placeholder="Product Id"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || productId === "" ? true : false}
          >
            Search
          </Button>
        </form>

        {reviews && reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productTable"
            autoHeight
          />
        ) : (
          <h1 className="productReviewsFormHeading">No Reviews Found</h1>
        )}
      </div>
    </>
  );
};

export default AllReviews;
