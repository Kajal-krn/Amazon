import axios from "axios"

import {
    ADMIN_ALL_REVIEWS_REQUEST,
    ADMIN_ALL_REVIEWS_SUCCESS,
    ADMIN_ALL_REVIEWS_FAIL,
    ADMIN_DELETE_REVIEW_REQUEST,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from "../constants/adminReviewConstants.js"

// all reviews of a product --Admin
export const adminAllReviews = (productId) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_ALL_REVIEWS_REQUEST
        })

        const {data} = await axios.get(`/api/v1/reviews?productId=${productId}`)

        dispatch({
            type : ADMIN_ALL_REVIEWS_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_ALL_REVIEWS_FAIL,
            payload : error.response.data.message
        })
    }
}

// delete review of a product --Admin
export const adminDeleteReview = (productId, reviewId) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_DELETE_REVIEW_REQUEST
        })

        const {data} = await axios.delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`)

        dispatch({
            type : ADMIN_DELETE_REVIEW_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_DELETE_REVIEW_FAIL,
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