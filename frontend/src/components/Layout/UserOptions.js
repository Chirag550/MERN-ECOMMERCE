import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./useroptions.css";
import { logout } from "../../REDUX/actions/userAction";
import Backdrop from "@mui/material/Backdrop";
import { MdShoppingCart } from "react-icons/md";
import { withWidth } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const { cartitems } = useSelector((state) => state.cart);
  const [open, SetOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Alert = useAlert();

  function Dashboard() {
    navigate("/admin");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    Alert.success("Logout Successfullly");
  }

  function cart() {
    navigate("/cart");
  }
  const options = [
    { icon: <MdListAlt />, name: "Orders", func: orders },
    { icon: <MdPerson />, name: "Profile", func: account },
    {
      icon: (
        <button type="button" className="cart-icon">
          <span className="cart-item-qty">{cartitems.length}</span>

          <MdShoppingCart
            style={{ color: cartitems.length > 0 ? "tomato" : "unset" }}
          />
        </button>
      ),
      name: "Cart",
      func: cart,
    },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: Dashboard,
    });
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        style={{ zIndex: "11" }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => SetOpen(false)}
        onOpen={() => SetOpen(true)}
        open={open}
        FabProps={{
          color: "secondary",
        }}
        direction="down"
        icon={
          <img
            style={{ height: "56px", width: "56px", borderRadius: "100%" }}
            src={user.avatar.url}
            alt="Profile"
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
