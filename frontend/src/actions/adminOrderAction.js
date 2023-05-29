import axios from "axios";

import {
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_FAIL,
    ADMIN_UPDATE_ORDER_REQUEST,
    ADMIN_UPDATE_ORDER_SUCCESS,
    ADMIN_UPDATE_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/adminOrderConstants"

// all orders --Admin
export const adminAllOrders = () => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/admin/orders")

        dispatch({
            type : ADMIN_ORDERS_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }
}

// update order --Admin
export const adminUpdateOrder = (id, order) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_UPDATE_ORDER_REQUEST
        })

        const config = {headers : {"Content-Type" : "application/json"}}

        const {data} = await axios.put(
            `/api/v1/admin/order/${id}`,
            order,
            config
        )

        dispatch({
            type : ADMIN_UPDATE_ORDER_SUCCESS,
            payload : data.success
        })

    }catch(error){
        dispatch({
            type : ADMIN_UPDATE_ORDER_FAIL,
            payload : error.response.data.message
        })
    }
}

// delete order --Admin
export const adminDeleteOrder = (id) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_DELETE_ORDER_REQUEST
        })

        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type : ADMIN_DELETE_ORDER_SUCCESS,
            payload : data.success
        })

    }catch(error){
        dispatch({
            type : ADMIN_DELETE_ORDER_FAIL,
            payload : error.response.data.message
        })
    }
}

// clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    })
}
