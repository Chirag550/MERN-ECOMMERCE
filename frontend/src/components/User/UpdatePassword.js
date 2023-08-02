import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword } from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../REDUX/constants/userConstants";
import { MdLockOpen } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { MdLock } from "react-icons/md";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Changed Successfully");

      navigate("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, dispatch, alert, isUpdated, navigate]);

  const UpdateSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("oldpassword", oldpassword);
    myform.set("newpassword", newpassword);
    myform.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myform));
  };

  return (
    <>
      <MetaData title="Update Password" />
      <div className="UpdateContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className="UpdateBox">
            <h2 className="UpdateHeading">Update Password</h2>
            <form className="UpdateForm" onSubmit={UpdateSubmit}>
              <div className="oldPassword">
                <MdVpnKey />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  name="oldpassword"
                  value={oldpassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="newPassword">
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  name="newpassword"
                  value={newpassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </div>
              <div className="confirmPassword">
                <MdLock />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
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

export default UpdatePassword;
