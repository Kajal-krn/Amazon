import React,{Fragment,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import {DataGrid} from "@material-ui/data-grid"
import {adminAllOrders, clearErrors, adminDeleteOrder} from "../../actions/adminOrderAction"
import MetaData from "../layout/MetaData.js"
import SideBar from "./SideBar.js"
import { ADMIN_DELETE_ORDER_RESET } from '../../constants/adminOrderConstants'
import "./OrderList.css"

const OrderList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, orders} = useSelector(state => state.adminOrders);
    const { error: deleteError, isDeleted } = useSelector(state => state.adminOrder);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
                cellClassName: (params) => {
                    return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
                },
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.4 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        { field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
                renderCell: (params) => {
                    return (
                        <Fragment>
                            <Link className="editButton" to={`/admin/order/${params.getValue(params.id, "id")}`}>
                                <EditIcon />
                            </Link>
            
                            <Button 
                                onClick={() =>
                                    deleteOrderHandler(params.getValue(params.id, "id"))
                                }
                            >
                                <DeleteIcon />
                            </Button>
                        </Fragment>
                    );
                },
          },
    ]

    const rows = []

    orders && orders.forEach(order => {
        rows.push({
            id: order._id,
            itemsQty: order.orderItems.length,
            amount: order.totalPrice,
            status: order.orderStatus,
        })
    })

    const deleteOrderHandler = (id) => {
        dispatch(adminDeleteOrder(id));
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    
        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            history.push("/admin/orders");
            dispatch({ type: ADMIN_DELETE_ORDER_RESET });
        }

        dispatch(adminAllOrders());
    },[dispatch,error,alert,deleteError,history,isDeleted])

    return (
        <Fragment>
            <MetaData title="ALL ORDERS -- Admin" />

            <div className="dashboard">
                <SideBar/>
                <div className="orderListContainer">
                    <h1 id="orderListHeading">ALL ORDERS</h1>

                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className="orderListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList
