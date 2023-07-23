import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
} from "../constants/orderConstant";

export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const MyOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
