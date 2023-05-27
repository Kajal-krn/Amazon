import './App.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import React , {useEffect} from 'react';
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

 
function App() {

    const {isAuthenticated, user} = useSelector(state =>  state.user)

    useEffect(() => {
        WebFont.load({
            google : {
                families : ["Roboto","Droid Sans","Chilanka"]
            }
        })

        store.dispatch(loadUser());

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

            <Footer />
        </Router>
    );
}

export default App;
