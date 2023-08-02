import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useEffect } from "react";
import "./Profile.css";
import MetaData from "../Layout/MetaData";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const ontop = () => {
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();
  const routepath = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    ontop();
  }, [isAuthenticated, navigate, routepath]);

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title="My Profile" />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt="profile" />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>FULL NAME</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substring(0, 10)}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
