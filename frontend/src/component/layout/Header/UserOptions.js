import React, { Fragment, useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { useAlert } from "react-alert";
import {useHistory} from "react-router-dom"
import {logout} from "../../../actions/userAction"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import Profile from "../../../images/Profile.png";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Backdrop from "@material-ui/core/Backdrop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import "./UserOptions.css";

const UserOptions = ({user}) => {

    const dispatch  = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {cartItems} = useSelector(state => state.cart)

    const options = [
        { icon : <ListAltIcon />, name: "Orders", click : orders },
        { icon : <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, click : cart},
        { icon : <PersonIcon />, name : "Profile", click : account },
        { icon : <ExitToAppIcon />, name : "Logout", click : logoutUser }
    ];

    if(user.role==="admin"){
        options.unshift({ icon : <DashboardIcon />, name : "DashBoard", click : dashboard })
    }

    const [open,setOpen] = useState(false);

    function dashboard(){
        history.push("/dashboard");
    }

    function orders(){
        history.push("/orders");
    }

    function cart(){
        history.push("/cart");
    }

    function account(){
        history.push("/account");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <Fragment>

            <Backdrop open={open} style={{zIndex : "10"}}/>

            <SpeedDial
                ariaLabel="SpeedDial Kit"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                direction="down"
                className="speedDial"
                style={{ zIndex: "11" }}
                icon={<img 
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : Profile}
                    alt="Profile"
                />}
            >
                {options.map((option) => (
                    <SpeedDialAction 
                        icon={option.icon} 
                        tooltipTitle={option.name} 
                        onClick={option.click} 
                        key={option.name} 
                        tooltipOpen={true} 
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
