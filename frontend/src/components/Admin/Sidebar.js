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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = ({ closeToggle }) => {
  const handleclose = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <>
      <div className="sidebar">
        {" "}
        <Link to="/">
          <img className="image" src={logo} alt="online shop" />
        </Link>
        <Link to="/admin/dashboard" onClick={handleclose}>
          <p>
            <MdDashboard /> Dashboard
          </p>
        </Link>
        <Link to="/admin/products" onClick={handleclose}>
          <p>
            <PostAddIcon /> All Products
          </p>
        </Link>
        <Link to="/admin/product" onClick={handleclose}>
          <p>
            <AddIcon /> Create Product
          </p>
        </Link>
        {/* <Link className="linkcontainer">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon className="link" />}
            defaultExpandIcon={<ImportExportIcon className="link" />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/product" onClick={handleclose} className="link">
                <TreeItem
                  nodeId="2"
                  label="All"
                  icon={<PostAddIcon style={{ width: 14, height: 14 }} />}
                />
              </Link>
              <Link to="/admin/product" onClick={handleclose} className="link">
                <TreeItem
                  nodeId="3"
                  label="create"
                  style={{
                    width: 14,
                    height: 14,
                  }}
                  icon={<AddIcon />}
                />
              </Link>
            </TreeItem>
          </TreeView>
        </Link> */}
        <Link to="/admin/orders" onClick={handleclose}>
          <p>
            <MdListAlt /> All orders
          </p>
        </Link>
        <Link to="/admin/users" onClick={handleclose}>
          <p>
            <MdPeople /> All users
          </p>
        </Link>
        <Link to="/admin/reviews" onClick={handleclose}>
          <p>
            <MdRateReview /> Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
