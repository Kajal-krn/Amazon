import {
    ADMIN_ALL_USERS_REQUEST,
    ADMIN_ALL_USERS_SUCCESS,
    ADMIN_ALL_USERS_FAIL,
    ADMIN_USER_DETAILS_REQUEST,
    ADMIN_USER_DETAILS_SUCCESS,
    ADMIN_USER_DETAILS_FAIL,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_RESET,
    ADMIN_UPDATE_USER_FAIL,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_RESET,
    ADMIN_DELETE_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/adminUserConstants.js"

// all user --Admin
export const adminAllUsersReducer = (state = {users:[]},action) => {
    switch(action.type){
        case ADMIN_ALL_USERS_REQUEST:
            return{
                ...state,
                loading : true,
            };
        case ADMIN_ALL_USERS_SUCCESS:
            return{
                ...state,
                loading : false,
                users : action.payload.users
            };
        case ADMIN_ALL_USERS_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        default:
            return state
    }
}

// sungle user details -- Admin
export const adminUserDetailsReducer = (state = {user:{}},action) => {
    switch(action.type){
        case ADMIN_USER_DETAILS_REQUEST:
            return{
                ...state,
                loading : true,
            };
        case ADMIN_USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading : false,
                user : action.payload.user
            };
        case ADMIN_USER_DETAILS_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        default:
            return state
    }
}

// update user details -- Admin
export const adminUserReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_UPDATE_USER_REQUEST:
        case ADMIN_DELETE_USER_REQUEST:
            return{
                ...state,
                loading : true,
            };
        case ADMIN_UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading : false,
                isUpdated : action.payload.success
            };
        case ADMIN_DELETE_USER_SUCCESS:
            return{
                ...state,
                loading : false,
                isDeleted : action.payload.success,
                message : action.payload.message
            };
        case ADMIN_UPDATE_USER_FAIL:
        case ADMIN_DELETE_USER_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case ADMIN_UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated : false
            }
        case ADMIN_DELETE_USER_RESET:
            return{
                ...state,
                isDeleted : false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        default:
            return state
    }
}