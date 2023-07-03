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
import { MdYoutubeSearchedFor } from "react-icons/md";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products/:keyword" element={<Product />}></Route>
        <Route exact path="/products" element={<Product />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
