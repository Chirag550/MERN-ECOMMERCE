import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdFace, MdLockOpen, MdMailOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login, register } from "../../REDUX/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const LoginSignUp = () => {
  const loginTab = useRef(null);
  const RegisterTab = useRef(null);
  const switcherTab = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/account";
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const alert = useAlert();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setavatarPreview] = useState(
    "https://tse1.mm.bing.net/th?id=OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, dispatch, alert, isAuthenticated, navigate]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("Login Form Submitted");
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("password", password);
    myform.set("avatar", avatar);
    dispatch(register(myform));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setavatarPreview(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("ShiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      RegisterTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "Register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      RegisterTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      <MetaData title="ONLINE SHOP -Login/Register" />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="Login_SignUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "Register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MdMailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <MdLockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password</Link>
            <input type="submit" value="Login" className="loginbtn" />
          </form>
          <form
            ref={RegisterTab}
            className="signUpForm"
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <MdFace />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MdMailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <MdLockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input type="file" name="avatar" onChange={registerDataChange} />
            </div>
            <input
              type="submit"
              value="Register"
              className="signUpbtn"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
