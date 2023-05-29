import {
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_NEW_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_SUCCESS,
    ADMIN_NEW_PRODUCT_RESET,
    ADMIN_NEW_PRODUCT_FAIL,
    CLEAR_ERRORS
} from "../constants/adminProductConstants.js"

export const adminProductsReducer = (state = {products : []},action) => {

    switch(action.type){
        case ADMIN_PRODUCTS_REQUEST:
            return{
                loading : true,
                products : []
            };
        case ADMIN_PRODUCTS_SUCCESS:
            return{
                loading : false,
                products : action.payload.products,
            }
        case ADMIN_PRODUCTS_FAIL:
            return{
                loading : false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        default : 
            return state;
    }
}

export const adminNewProductReducer = (state = {product : {}},action) => {

    switch(action.type){
        case ADMIN_NEW_PRODUCT_REQUEST:
            return{
                loading : true,
                ...state
            };
        case ADMIN_NEW_PRODUCT_SUCCESS:
            return{
                loading : false,
                success : action.payload.success,
                product : action.payload.product
            }
        case ADMIN_NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case ADMIN_NEW_PRODUCT_RESET:
            return{
                ...state,
                loading : false,
                success : false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null
            }
        default : 
            return state;
    }
}

