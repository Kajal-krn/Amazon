import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData.js";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <Fragment>

        <MetaData title="Success" />

        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    </Fragment>
  );
};

export default OrderSuccess;