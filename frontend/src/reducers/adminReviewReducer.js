import {
    ADMIN_ALL_REVIEWS_REQUEST,
    ADMIN_ALL_REVIEWS_SUCCESS,
    ADMIN_ALL_REVIEWS_FAIL,
    ADMIN_DELETE_REVIEW_REQUEST,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_RESET,
    ADMIN_DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from "../constants/adminReviewConstants.js"

export const adminAllReviewsReducer = (state = {reviews : []},action) => {

    switch(action.type){
        case ADMIN_ALL_REVIEWS_REQUEST:
            return{
                ...state,
                loading : true
            };
        case ADMIN_ALL_REVIEWS_SUCCESS:
            return{
                loading : false,
                reviews : action.payload.reviews
            }
        case ADMIN_ALL_REVIEWS_FAIL:
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
        default : 
            return state;
    }
}

export const adminDeleteReviewReducer = (state = {},action) => {

    switch(action.type){
        case ADMIN_DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading : true
            };
        case ADMIN_DELETE_REVIEW_SUCCESS:
            return{
                loading : false,
                isDeleted : action.payload.success
            }
        case ADMIN_DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        case ADMIN_DELETE_REVIEW_RESET:
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
        default : 
            return state;
    }
}