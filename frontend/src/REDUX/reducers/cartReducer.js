import { ADD_TO_CART, REMOTE_CART } from "../constants/cartConstants";
export const CartReducer = (state = { cartitems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload; //we will get our product from here through action;
      const isItemExist = state.cartitems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartitems: state.cartitems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartitems: [...state.cartitems, item],
        };
      }
    case REMOTE_CART:
      return {
        ...state,
        cartitems: state.cartitems.filter((i) => i.product !== action.payload),
      };

    default:
      return state;
  }
};
