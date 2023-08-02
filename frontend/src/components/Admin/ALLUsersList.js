import React, { useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import "./AllProductList.css";
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../REDUX/actions/userAction";
import MetaData from "../Layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { DELETE_USER_RESET } from "../../REDUX/constants/userConstants";

const ALLUsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.profile
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, users, error, loading, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row["role"] === "admin" ? "greenColor" : "redColor";
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
            <div className="action">
              <Link to={`/admin/user/${params.row["id"]}`}>
                <MdEdit />
              </Link>
              <Button onClick={() => dispatch(deleteUser(params.row["id"]))}>
                {/* <Button onClick={() => deleteUserHandler(params.row["id"])}> */}
                <MdDelete />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
      {" "}
      <MetaData title="ADMIN- All Users" />
      <div className="dashContainer">
        <Typography component="h1">All Users</Typography>
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

export default ALLUsersList;
