import {
  ADD_TO_CART,
  REMOVE_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";
export const ADDTOCART = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      price: data.product.price,
      name: data.product.name,
      image: data.product.images[0].url,
      Stock: data.product.Stock,
      quantity,
    },
  });
  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

export const REMOVECART = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART, payload: id });
  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

export const SAVESHIPPINGINFO = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippinginfo", JSON.stringify(data));
};
