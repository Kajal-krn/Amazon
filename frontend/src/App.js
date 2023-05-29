import './App.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import React , {useEffect,useState} from 'react';
import WebFont from 'webfontloader';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignup from './component/User/LoginSignup.js';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails.js";
import DashBoard from "./component/Admin/DashBoard.js";
import ProductList from "./component/Admin/ProductList.js"

function App() {

    const {isAuthenticated, user} = useSelector(state =>  state.user)

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey(){
        const {data} = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey)
    }

    useEffect(() => {
        WebFont.load({
            google : {
                families : ["Roboto","Droid Sans","Chilanka"]
            }
        })

        store.dispatch(loadUser());
        getStripeApiKey();

    },[])

    return (
        <Router>
            <Header />

            {isAuthenticated && <UserOptions user={user} />}

            <Route exact path="/" component={Home} />
            <Route path="/product/:productId" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={LoginSignup} />
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
            <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route path="/password/reset/:token" component={ResetPassword} />
            <Route path="/cart" component={Cart} />
            <ProtectedRoute path="/shipping" component={Shipping}/>
            <ProtectedRoute path="/orders/confirm" component={ConfirmOrder} />
            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute path="/process/payment" component={Payment} />
                </Elements>
            )}
            <ProtectedRoute path="/success" component={OrderSuccess} />
            <ProtectedRoute exact path="/orders" component={MyOrders} />
            <ProtectedRoute exact path="/order/:OrderId" component={OrderDetails} />

            <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={DashBoard} />
            <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />

            <Footer />
        </Router>
    );
}

export default App;
