import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./useroptions.css";
import { logout } from "../../REDUX/actions/userAction";
import Backdrop from "@mui/material/Backdrop";

const UserOptions = ({ user }) => {
  const [open, SetOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Alert = useAlert();

  function Dashboard() {
    navigate("/dashboard");
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
  const options = [
    { icon: <MdListAlt />, name: "Orders", func: orders },
    { icon: <MdPerson />, name: "Profile", func: account },
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
        direction="down"
        icon={
          <img className="speedDialIcon" src={user.avatar.url} alt="Profile" />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
