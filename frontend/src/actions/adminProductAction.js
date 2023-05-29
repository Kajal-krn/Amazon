import axios  from "axios";

import {
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_NEW_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_SUCCESS,
    ADMIN_NEW_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS
} from "../constants/adminProductConstants.js"

// get all products --Admin
export const getAdminProducts = () => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_PRODUCTS_REQUEST
        })

        const {data} = await axios.get("/api/v1/admin/products");

        dispatch({
            type : ADMIN_PRODUCTS_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_PRODUCTS_FAIL,
            payload : error.response.data.message
        })
    }
}

// new product --Admin
export const adminCreateProduct = (product) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_NEW_PRODUCT_REQUEST
        })

        const config = {headers : {"Content-Type" : "application/json"}}

        const {data} = await axios.post(
            "/api/v1/admin/products/new", 
            product, 
            config
        );

        dispatch({
            type : ADMIN_NEW_PRODUCT_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ADMIN_NEW_PRODUCT_FAIL,
            payload : error.response.data.message
        })
    }
}

export const adminDeleteProduct = (productId) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_DELETE_PRODUCT_REQUEST
        })

        const {data} = await axios.delete(`/api/v1/admin/products/${productId}`);

        dispatch({
            type : ADMIN_DELETE_PRODUCT_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ADMIN_DELETE_PRODUCT_FAIL,
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