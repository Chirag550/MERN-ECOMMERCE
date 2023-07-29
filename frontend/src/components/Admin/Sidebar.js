import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import TreeView from "@mui/lab/TreeView";
import logo from "../../assets/logo (2).png";
import TreeItem from "@mui/lab/TreeItem";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <img className="image" src={logo} alt="online shop" />
        </Link>
        <Link to="/admin/dashboard">
          <MdDashboard /> Dashboard
        </Link>
        <Link>
          <TreeView
            defaultCollapseIcon={MdExpandMore}
            defaultExpandIcon={MdImportExport}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/product" className="Tree">
                <TreeItem nodeId="2" label="All" icon={MdPostAdd} />
              </Link>
              <Link to="/admin/product" className="Tree">
                <TreeItem nodeId="3" label="create" icon={MdAdd} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <MdListAlt /> All orders
        </Link>
        <Link to="/admin/users">
          <MdPeople /> All users
        </Link>
        <Link to="/admin/reviews">
          <MdRateReview /> Reviews
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
