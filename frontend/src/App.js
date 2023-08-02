import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Search from "./components/Product/Search";

import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Product";

import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./REDUX/actions/userAction";
import store from "./REDUX/store/store";
import { useSelector } from "react-redux";
import UserOptions from "./components/Layout/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/Cart/Payment";
import Success from "./components/Cart/Success";
import MyOrder from "./components/Orders/MyOrder";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [StripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/StripeApiKey");

    setStripeApiKey(data.StripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/product/:id" Component={ProductDetails}></Route>
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/products/:keyword" element={<Product />}></Route>
        <Route exact path="/products" element={<Product />}></Route>

        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/login" element={<LoginSignUp />}></Route>
        {/* <ProtectedRoute
          exact
          path="/account"
          element={<Profile />}
        ></ProtectedRoute> */}
        <Route
          exact
          path="/account"
          element={<ProtectedRoute element={Profile} />}
        />
        <Route
          exact
          path="/myorder/:id"
          element={<ProtectedRoute element={OrderDetails} />}
        />
        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute element={Shipping} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute element={MyOrder} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute element={ConfirmOrder} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute element={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute element={UpdatePassword} />}
        />
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/success"
          element={<ProtectedRoute element={Success} />}
        />
        {StripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(StripeApiKey)}>
                <ProtectedRoute element={Payment} />{" "}
              </Elements>
            }
          />
        )}

        <Route
          exact
          path="/admin/*"
          element={<ProtectedRoute isAdmin={true} element={Dashboard} />}
        />

        <Route exact path="/reset/:token" element={<ResetPassword />}></Route>
        <Route exact path="/contact" Component={Contact}></Route>
        <Route exact path="/about" Component={About}></Route>
        {/* <Route exact path="/nav" element={<Navbar />}></Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
