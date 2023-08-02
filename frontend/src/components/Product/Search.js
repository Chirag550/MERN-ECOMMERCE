import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../Layout/MetaData";
const Search = () => {
  const [keyword, setkeyword] = useState("");
  let navigate = useNavigate();

  const searchsubmithandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <MetaData title="Search A Product -- ONLINE SHOP" />
      <form className="searchbox" onSubmit={searchsubmithandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default Search;
