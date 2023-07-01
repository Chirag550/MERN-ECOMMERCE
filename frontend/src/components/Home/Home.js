import React from "react";
import "./Home.css";
import Product from "./Product";
const Home = () => {
  const product = [
    {
      name: "Blue Tshirt",
      images: [
        {
          url: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3b%2F26%2F3b26a831f18321056a12324a6f44a8c01b8ee8ff.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
        },
      ],
      price: "$3000",
      _id: "chirag",
    },
    {},
  ];
  return (
    <>
      <div className="banner">
        <p>Welcome to Online Shop</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
