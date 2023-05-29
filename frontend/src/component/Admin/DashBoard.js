import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import SideBar from './SideBar.js'
import {Doughnut, Line} from "react-chartjs-2"
import MetaData from "../layout/MetaData.js"
import "./DashBoard.css"


const DashBoard = () => {

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
                data: [2, 10],
            },
        ]
    }

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
                            <p>50</p>
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
