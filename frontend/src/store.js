import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productReducer, newReviewReducer} from "./reducers/productReducer";
import {userReducer, profileReducer, forgotPasswordReducer} from "./reducers/userReducer"
import {cartReducer} from "./reducers/cartReducer"
import {MyOrdersReducer, newOrderReducer, orderDetailsReducer} from "./reducers/orderReducer"
import {adminNewProductReducer, adminProductsReducer, adminProductReducer} from "./reducers/adminProductReducer"
import { adminOrderReducer, adminOrdersReducer } from "./reducers/adminOrderReducer";
import {adminAllUsersReducer, adminUserDetailsReducer, adminUserReducer} from "./reducers/adminUserReducer"
import { adminAllReviewsReducer, adminDeleteReviewReducer } from "./reducers/adminReviewReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : MyOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    adminProducts : adminProductsReducer,
    adminNewProduct : adminNewProductReducer,
    adminProduct : adminProductReducer,
    adminOrders : adminOrdersReducer,
    adminOrder : adminOrderReducer,
    adminUsers : adminAllUsersReducer,
    adminUserDetails : adminUserDetailsReducer, // for user details
    adminUser : adminUserReducer,  // change details of user or delete user
    adminReviews : adminAllReviewsReducer,
    adminDeleteReview : adminDeleteReviewReducer
});

let initialState = {
    cart : {
        cartItems : localStorage.getItem("cartItems") ? 
                        JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo : localStorage.getItem("shippingInfo") ? 
                        JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;