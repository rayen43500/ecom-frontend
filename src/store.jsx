import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteUpdateReducer,
   getALLReviewReducer,
   deleteReviewReducer
} from "./reducers/productReducers";
import {
  profileReducer,
  userReducer,
  forgetPasswordReducer,
  userDetailsReducer,
  allUsersReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrderReducer,
  orderDetialsReducer,
  allOrdersReducer,
  deletUpdateOrderReducer,
} from "./reducers/orderReducer";
import { bannersReducer, bannerReducer } from "./reducers/bannerReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  userData: userReducer,
  profileData: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  orderDetails: orderDetialsReducer,
  addNewReview: newReviewReducer,
  addNewProduct: newProductReducer,
  deleteUpdateProduct: deleteUpdateReducer,
  allOrders: allOrdersReducer,
  deleteUpdateOrder: deletUpdateOrderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteReview :deleteReviewReducer,
  getAllReview : getALLReviewReducer,
  bannersList: bannersReducer,
  bannerAction: bannerReducer,
});

// get all Cart values from local storage and pass this initial state into store
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};


const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, composeEnhancers);

export default store;
