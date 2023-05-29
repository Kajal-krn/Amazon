import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import SideBar from './SideBar.js'
import {Doughnut, Line} from "react-chartjs-2"
import {getAdminProducts, clearErrors as productErrors} from "../../actions/adminProductAction"
import {adminAllOrders, clearErrors as orderClearErrors} from "../../actions/adminOrderAction"
import MetaData from "../layout/MetaData.js"
import "./DashBoard.css"


const DashBoard = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error : productError, products} = useSelector(state => state.adminProducts);
    const {error : orderError, orders} = useSelector(state => state.adminOrders);

    let OutOfStock = 0;
    let InStock = 0;

    products && products.forEach(product => {
        if(product.stock === 0){
            OutOfStock += 1;
        }else{
            InStock += 1;
        }
    })

    let totalAmount = 0;
    let processingCount = 0;
    let shippingCount = 0;
    let deliveredCount = 0;
    orders && orders.forEach(order => {
        totalAmount += order.totalPrice
        if(order.orderStatus === "Delivered"){
            deliveredCount++;
        }else if(order.orderStatus === "Shipped"){
            shippingCount++;
        }else{
            processingCount++;
        }
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const productDoughnutState = {
        labels : ["Out of Stock", "InStock"],
        datasets : [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#00008B", "#35014F"],
                data: [OutOfStock, InStock],
            },
        ]
    }

    const orderDoughnutState = {
        labels : ["Processing", "Shipped", "Delivered"],
        datasets : [
            {
                backgroundColor: ["#FF0000", "#FFFF00","#00ff00"],
                hoverBackgroundColor: ["#800000", "#FFAA1D","#006400"],
                data: [processingCount, shippingCount, deliveredCount],
            },
        ]
    }

    useEffect(() => {
        if(productError){
            alert.error(productError);
            dispatch(productErrors());
        }
        if(orderError){
            alert.error(orderError);
            dispatch(orderClearErrors());
        }
        dispatch(getAdminProducts());
        dispatch(adminAllOrders());
    },[dispatch,productError,alert,orderError])

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <SideBar />

            <div className="dashboardContainer">
                <Typography component="h1">DashBoard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br/> 28100
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && (OutOfStock+InStock)}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>5</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState}/>
                </div>

                <div className="doughnutChart">
                    <Doughnut data={productDoughnutState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={orderDoughnutState} />
                </div>

            </div>
        </div>
    )
}

export default DashBoard
