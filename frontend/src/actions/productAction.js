import axios  from "axios";

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants"

// getting all products
export const getProducts = (keyword="",currentPage=1,price=[0,50000],category,rating=0) => async(dispatch) => {
    try{
        dispatch({
            type : ALL_PRODUCT_REQUEST
        })

        let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if(category){
            url += `&category=${category}`;
        }

        url += `&ratings[gte]=${rating}`;

        const {data} = await axios.get(url);

        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message
        })
    }
}

// get product details
export const getProductDetails = (productId) => async(dispatch) => {
    try{
        dispatch({
            type : PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/v1/products/${productId}`);

        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
}

// new review
export const newReview = (review) => async(dispatch) => {
    try{
        dispatch({
            type : NEW_REVIEW_REQUEST
        })

        const config = {headers : {"Content-Type" : "application/json"}}

        const {data} = await axios.put(
            "/api/v1/review", 
            review, 
            config
        );

        dispatch({
            type : NEW_REVIEW_SUCCESS,
            payload : data.success
        })
    }catch(error){
        dispatch({
            type : NEW_REVIEW_FAIL,
            payload : error.response.data.message
        })
    }
}

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

// clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    })
}