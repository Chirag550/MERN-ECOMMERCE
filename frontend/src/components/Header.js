import React from "react";

import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../assets/logo (2).png";

const Header = () => {
  return (
    <ReactNavbar
      logo={logo}
      logoWidth="25vmax"
      burgerColor="gray"
      navColor1="white"
      logoHoverSize="0px"
      logoHoverColor="gray"
      searchIcon={true}
      SearchIconElement={MdSearch}
      searchIconColor="rgba(35 , 35 ,35 , 0.8)"
      searchIconColorHover="#eb4034"
      searchIconMargin="1vmax"
      cartIcon={true}
      CartIconElement={MdAddShoppingCart}
      cartIconColor="rgba(35 , 35 ,35 , 0.8)"
      cartIconColorHover="eb4034"
      cartIconMargin="1vmax"
      profileIcon={true}
      ProfileIconElement={MdAccountCircle}
      profileIconColor="rgba(35 , 35 ,35 , 0.8)"
      profileIconColorHover="eb4034"
      profileIconMargin="1vmax"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.5vmax"
      link2Size="1.5vmax"
      link3Size="1.5vmax"
      link4Size="1.5vmax"
      link1Color="rgba(35 , 35 ,35 , 0.8)"
      link1ColorHover="#eb4034"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      link1Margin="1vmax"
      link2Margin="0vmax"
      link3Margin="1vmax"
      link4Margin="0vmax"
      link1Padding="0"
      link2Padding="2"
      link3Padding="3"
      link4Padding="4"
    />
  );
};

export default Header;