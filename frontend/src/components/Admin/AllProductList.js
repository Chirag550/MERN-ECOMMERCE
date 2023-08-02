import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  DeleteProducts,
  clearErrors,
  getAdminProducts,
} from "../../REDUX/actions/ProductAction";
import "./AllProductList.css";
import { Button, Typography } from "@mui/material";
import { DELETE_PRODUCT_RESET } from "../../REDUX/constants/productConstants";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const AllProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const { success, error: loadingerror } = useSelector(
    (state) => state.DeleteProduct
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (loadingerror) {
      alert.error(loadingerror);
      dispatch(clearErrors);
    }

    if (success) {
      alert.success("Product has been Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, success, loadingerror, alert, error]);
  if (loading) return <Loader />;

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <MetaData title="ADMIN- All Products" />
            <div className="action">
              <Link to={`/admin/product/${params.row["id"]}`}>
                <MdEdit />
              </Link>

              <Button
                onClick={() => {
                  dispatch(DeleteProducts(params.row["id"]));
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <div className="dashContainer">
        <Typography component="h1">All Products</Typography>
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

export default AllProductList;
