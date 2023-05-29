import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import SideBar from './SideBar.js'
import {Doughnut, Line} from "react-chartjs-2"
import {getAdminProducts, clearErrors} from "../../actions/adminProductAction"
import MetaData from "../layout/MetaData.js"
import "./DashBoard.css"


const DashBoard = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error : productError, products} = useSelector(state => state.adminProducts);

    let OutOfStock = 0;
    let InStock = 0;

    products && products.forEach(product => {
        if(product.stock === 0){
            OutOfStock += 1;
        }else{
            InStock += 1;
        }
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 1000],
            },
        ],
    };

    const doughnutState = {
        labels : ["Out of Stock", "InStock"],
        datasets : [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [OutOfStock, InStock],
            },
        ]
    }

    useEffect(() => {
        if(productError){
            alert.error(productError);
            dispatch(clearErrors());
        }
        dispatch(getAdminProducts());
    },[dispatch,productError,alert])

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
                            <p>23</p>
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
                    <Doughnut data={doughnutState} />
                </div>

            </div>
        </div>
    )
}

export default DashBoard
