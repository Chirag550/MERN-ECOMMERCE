import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  CreateProductReducer,
  DeleteProductReducer,
  NewReviewReducer,
  UpdateProductReducer,
  productReducer,
} from "../reducers/productReducer";
import { productDetailsReducer } from "../reducers/productReducer";

import {
  userReducer,
  ProfileReducer,
  ForgotPasswordReducer,
} from "../reducers/userReducer";
import { CartReducer } from "../reducers/cartReducer";
import {
  MyOrderReducer,
  OrderDetailsReducer,
  OrderReducer,
} from "../reducers/OrderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgot: ForgotPasswordReducer,
  cart: CartReducer,
  neworder: OrderReducer,
  myOrder: MyOrderReducer,
  orderDetail: OrderDetailsReducer,
  createReview: NewReviewReducer,
  createProduct: CreateProductReducer,
  DeleteProduct: DeleteProductReducer,
  UpdateProduct: UpdateProductReducer,
});
const initialState = {
  cart: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    shippingInfo: localStorage.getItem("shippinginfo")
      ? JSON.parse(localStorage.getItem("shippinginfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
