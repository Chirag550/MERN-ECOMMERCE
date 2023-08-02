import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../REDUX/actions/ProductAction";
import { OrderAdmin } from "../../REDUX/actions/OrderAction";
import { getAllUsers } from "../../REDUX/actions/userAction";
import MetaData from "../Layout/MetaData";
ChartJS.register(...registerables);
const DashboardPage = () => {
  const { products } = useSelector((state) => state.products);
  const { orders, totalamount } = useSelector((state) => state.AdminAllOrder);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);

  let outofStock = 0;
  products?.forEach((element) => {
    if (element.Stock === 0) {
      outofStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(OrderAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);
  const lineState = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverbackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalamount],
      },
    ],
  };
  const dougnutstate = {
    labels: ["out of stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverbackgroundColor: ["4B5000", "35014F"],
        data: [outofStock, products.length - outofStock],
      },
    ],
  };
  return (
    <>
      <MetaData title="ADMIN- DashBoard" />
      <div className="dashContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardsummary">
          <div>
            <p>
              Total Amount <br></br> ${totalamount}
            </p>
          </div>
          <div className="box2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>
        <div className="linechart">
          <Line data={lineState} />
        </div>
        <div className="dougnutchart">
          <Doughnut data={dougnutstate} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
