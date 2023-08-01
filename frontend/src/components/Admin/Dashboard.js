import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import "./Dashboard.css";

import { AiFillCloseCircle } from "react-icons/ai";

import DashboardPage from "./DashboardPage";

import AllProductList from "./AllProductList";

import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import AllOrderList from "./AllOrderList";
import UpdateOrder from "./UpdateOrder";
import ALLUsersList from "./ALLUsersList";
const Dashboard = () => {
  const [open, setisOpen] = useState(false);
  return (
    <>
      <div className="Dashboard-page" style={{ zIndex: "664" }}>
        <div className="Dashboard">
          <div className="sidebarcontainer">
            <Sidebar />
          </div>
          <div className="MobileSidebarcontainer">
            <div className="SidebarCOntainer_Mobile">
              <div className="Mobile_sidebar">
                {!open && (
                  <div
                    onClick={() => {
                      setisOpen(!open);
                    }}
                  >
                    <button className="btn">MORE ADMIN OPTIONS</button>
                  </div>
                )}

                {/* <HiMenu
                  fontSize={40}
                  color="white"
                  onClick={() => {
                    setisOpen(!open);
                  }}
                /> */}
              </div>
            </div>
            {open && (
              <div className="MobileSidebar" style={{ zIndex: "14" }}>
                <div className="mobile">
                  <AiFillCloseCircle
                    className="circle"
                    color="white"
                    onClick={() => {
                      setisOpen(false);
                    }}
                  />
                  <div>
                    <Sidebar closeToggle={setisOpen} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="dashboardcontainer">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<AllProductList />} />
              <Route path="/product" element={<CreateProduct />} />
              <Route path="/users" element={<ALLUsersList />} />
              <Route path="/orders" element={<AllOrderList />} />
              <Route path="/order/:id" element={<UpdateOrder />} />
              <Route path="/product/:id" element={<UpdateProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
