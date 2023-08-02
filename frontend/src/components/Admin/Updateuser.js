import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../REDUX/actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { updateUser } from "../../REDUX/actions/userAction";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import { UPDATE_USER_RESET } from "../../REDUX/constants/userConstants";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";

const Updateuser = () => {
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updatedError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (updatedError) {
      alert.error(updatedError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, user, loading, error, isUpdated, updatedError]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };
  return (
    <>
      <MetaData title="ADMIN- Update User" />
      <div className="newProductContainer">
        <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
          <h1>Update User</h1>

          <div>
            <PersonIcon />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <VerifiedUserIcon />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={
              updateLoading ? true : false || role === "" ? true : false
            }
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default Updateuser;
