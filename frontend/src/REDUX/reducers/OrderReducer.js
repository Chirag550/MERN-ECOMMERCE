import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
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

export const OrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
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
export const AdminOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
      };
    case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_ORDER_RESET:
      return {
        loading: false,
        isDeleted: false,
      };
    case UPDATE_ORDER_RESET:
      return {
        loading: false,
        isUpdated: false,
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
export const AllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalamount: action.payload.totalamount,
      };
    case ALL_ORDER_FAIL:
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
