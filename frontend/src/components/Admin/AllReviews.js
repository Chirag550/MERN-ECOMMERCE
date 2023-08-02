import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../../REDUX/actions/ProductAction";
import { DELETE_REVIEW_RESET } from "../../REDUX/constants/productConstants";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader/Loader";

const AllReviews = () => {
  return <div></div>;
};

export default AllReviews;
