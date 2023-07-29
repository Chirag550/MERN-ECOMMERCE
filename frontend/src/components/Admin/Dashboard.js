import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import "./Dashboard.css";

import DashboardPage from "./DashboardPage";
import AllProduct from "./AllProduct";
import Users from "./Users";
const Dashboard = () => {
  return (
    <>
      <div className="Dashboard-page">
        <div className="Dashboard">
          <div className="sidebarcontainer">
            <Sidebar />
          </div>

          <div className="dashboardcontainer">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/product" element={<AllProduct />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
