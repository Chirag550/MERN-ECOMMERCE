import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";

import { MdMailOutline } from "react-icons/md";
import { forgotPassword } from "../../REDUX/actions/userAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.forgot);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, dispatch, alert, message]);

  const UpdateSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  return (
    <>
      <MetaData title="Forgot Password" />
      <div className="UpdateContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className="UpdateBox">
            <h2 className="UpdateHeading">Update Password</h2>
            <form className="UpdateForm" onSubmit={UpdateSubmit}>
              <div className="loginEmail">
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="UpdateBtn"
                disabled={loading ? true : false}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
