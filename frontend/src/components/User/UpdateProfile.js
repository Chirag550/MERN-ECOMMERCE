import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { MdFace, MdMailOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../REDUX/constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setavatarPreview] = useState(
    "https://tse1.mm.bing.net/th?id=OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (user) {
      setname(user.name);
      setemail(user.email);
      setavatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [error, dispatch, alert, isUpdated, navigate]);

  const UpdateSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);
    dispatch(updateProfile(myform));
  };

  const registerDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setavatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title="Update Profile" />
      <div className="UpdateContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className="UpdateBox">
            <h2 className="UpdateHeading">Update Profile</h2>
            <form
              className="UpdateForm"
              encType="multipart/form-data"
              onSubmit={UpdateSubmit}
            >
              <div className="UpdateName">
                <MdFace />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="UpdateEmail">
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div id="UpdateImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Update"
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

export default UpdateProfile;
