import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import "./MyOrder.css";
import MetaData from "../Layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { MyOrders, clearErrors } from "../../REDUX/actions/OrderAction";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";

const MyOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row["status"] === "processing"
          ? "redColor"
          : "greenColor";
      },
    },
    {
      field: "itemqty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Link to={`/myorder/${params.row["id"]}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemqty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(MyOrders());
  }, [dispatch, error, alert]);
  if (loading) return <Loader />;
  return (
    <>
      <MetaData title="My Orders" />
      <div className="orderPage">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="orderTable"
          autoHeight
        />
        <Typography className="myOrderHeading">{user.name}'s Orders</Typography>
      </div>
    </>
  );
};

export default MyOrder;
