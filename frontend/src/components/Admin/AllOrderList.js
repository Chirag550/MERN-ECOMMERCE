import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderAdmin, clearErrors } from "../../REDUX/actions/OrderAction";
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DeleteOrder } from "../../REDUX/actions/OrderAction";
import { DELETE_ORDER_RESET } from "../../REDUX/constants/orderConstant";
import { MdDelete } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { MdEdit } from "react-icons/md";
import { Button } from "@mui/material";

const AllOrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { orders, error, loading } = useSelector(
    (state) => state.AdminAllOrder
  );
  const { isDeleted, error: deletedError } = useSelector(
    (state) => state.AdminOrder
  );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,

      flex: 0.5,
      cellClassName: (params) => {
        if (params.value === "processing") {
          return "redColor";
        } else return "greenColor";
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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="action">
              <Link to={`/admin/order/${params.row["id"]}`}>
                <MdEdit />
              </Link>

              <Button
                onClick={() => {
                  dispatch(DeleteOrder(params.row["id"]));
                }}
              >
                <MdDelete />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
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
      dispatch(clearErrors());
    }
    if (deletedError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(OrderAdmin());
  }, [dispatch, loading, alert, error]);
  return (
    <>
      <div className="dashContainer">
        <Typography component="h1">All Orders</Typography>
        <div className="productListContainer" style={{ zIndex: "3" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default AllOrderList;
