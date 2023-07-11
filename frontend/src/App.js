import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WebFont from "webfontloader";
import { useEffect } from "react";
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log("i am rendered");
  console.log(isAuthenticated);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
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

        {/* <Route exact path="/nav" element={<Navbar />}></Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
