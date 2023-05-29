import {
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_RESET,
    ADMIN_DELETE_ORDER_FAIL,
    ADMIN_UPDATE_ORDER_REQUEST,
    ADMIN_UPDATE_ORDER_SUCCESS,
    ADMIN_UPDATE_ORDER_RESET,
    ADMIN_UPDATE_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/adminOrderConstants"

// order list --Admin
export const adminOrdersReducer = (state = {orders:[]}, action) => {
    switch(action.type){
        case ADMIN_ORDERS_REQUEST:
            return{
                loading : true
            }

        case ADMIN_ORDERS_SUCCESS:
            return{
                loading : false,
                orders : action.payload.orders
            }

        case ADMIN_ORDERS_FAIL:
            return{
                loading : false,
                error : action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }

        default:
            return state;
    }
}

// order list --Admin
export const adminOrderReducer = (state = {}, action) => {
    switch(action.type){
        case ADMIN_UPDATE_ORDER_REQUEST:
        case ADMIN_DELETE_ORDER_REQUEST:
            return{
                ...state,
                loading : true
            }

        case ADMIN_UPDATE_ORDER_SUCCESS:
            return{
                ...state,
                loading : false,
                isUpdated : action.payload
            }
        case ADMIN_DELETE_ORDER_SUCCESS:
            return{
                ...state,
                loading : false,
                isDeleted : action.payload
            }
        case ADMIN_UPDATE_ORDER_FAIL:
        case ADMIN_DELETE_ORDER_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case ADMIN_UPDATE_ORDER_RESET:
            return{
                ...state,
                loading : false,
                isUpdated : false
            }
        case ADMIN_DELETE_ORDER_RESET:
            return{
                ...state,
                loading : false,
                isDeleted : false
        }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }

        default:
            return state;
    }
}