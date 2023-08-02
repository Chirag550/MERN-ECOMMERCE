import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";
import { MdLockOpen } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../REDUX/actions/userAction";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { token } = useParams();

  const { loading, error, isreset } = useSelector((state) => state.forgot);
  const [newpassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isreset) {
      alert.success("Password has been reset successfully log in to continue");
      navigate("/account");
    }
  }, [error, dispatch, alert, isreset, navigate]);

  const UpdateSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("newpassword", newpassword);
    myform.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myform));
  };

  return (
    <>
      <MetaData title="Reset Password" />
      <div className="UpdateContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className="UpdateBox">
            <h2 className="UpdateHeading">Reset Password</h2>
            <form className="UpdateForm" onSubmit={UpdateSubmit}>
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
                value="Reset"
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
export default ResetPassword;
