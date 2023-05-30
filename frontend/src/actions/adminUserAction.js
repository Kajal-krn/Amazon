import axios from "axios"

import {
    ADMIN_ALL_USERS_REQUEST,
    ADMIN_ALL_USERS_SUCCESS,
    ADMIN_ALL_USERS_FAIL,
    ADMIN_USER_DETAILS_REQUEST,
    ADMIN_USER_DETAILS_SUCCESS,
    ADMIN_USER_DETAILS_FAIL,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_FAIL,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/adminUserConstants.js"

// all users --Admin
export const adminAllUsers = () => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_ALL_USERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/admin/users")

        dispatch({
            type : ADMIN_ALL_USERS_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_ALL_USERS_FAIL,
            payload : error.response.data.message
        })
    }
}

// user details --Admin
export const adminUserDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_USER_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type : ADMIN_USER_DETAILS_SUCCESS,
            payload : data
        })

    }catch(error){
        dispatch({
            type : ADMIN_USER_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
}

// update user -- Admin
export const adminUpdateUser = (id, Userdata) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_UPDATE_USER_REQUEST
        })

        const config = {headers : {"Content-Type" : "application/json"}}

        const {data} = await axios.put(
            `/api/v1/admin/user/${id}`,
            Userdata,
            config
        )

        dispatch({
            type : ADMIN_UPDATE_USER_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ADMIN_UPDATE_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

// update user -- Admin
export const adminDeleteUser = (id) => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_DELETE_USER_REQUEST
        })

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type : ADMIN_DELETE_USER_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ADMIN_DELETE_USER_FAIL,
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