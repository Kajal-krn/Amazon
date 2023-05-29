import React from 'react'
import {Link} from "react-router-dom"
import {TreeView,TreeItem} from "@material-ui/lab"
import logo from "../../images/logo.png"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import "./SideBar.css"

const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Amazon"/>
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon />DashBoard
                </p>
            </Link>
            
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ImportExportIcon/>}
                >
                    <TreeItem nodeId='1' label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />}></TreeItem>
                        </Link>
                        <Link to="/admin/product/create">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>

            <Link to="/admin/orders">
                <p>
                    <ListAltIcon />Orders
                </p>
            </Link>

            <Link to="/admin/users">
                <p>
                    <PeopleIcon />Users
                </p>
            </Link>

            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon />Reviews
                </p>
            </Link>

        </div>
  )
}

export default SideBar
