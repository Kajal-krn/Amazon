import React,{ Fragment , useEffect , useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import Star from "@material-ui/icons/Star";
import {DataGrid} from "@material-ui/data-grid"
import {adminAllReviews, clearErrors, adminDeleteReview} from "../../actions/adminReviewAction"
import MetaData from "../layout/MetaData.js"
import SideBar from "./SideBar.js"
import { ADMIN_DELETE_REVIEW_RESET } from '../../constants/adminReviewConstants'
import "./ProductReviews.css"

const ProductReviews = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, loading , reviews } = useSelector(state => state.adminReviews);
    const { error: deleteError, isDeleted } = useSelector(state => state.adminDeleteReview);

    const [productId, setProductId] = useState("");

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
        { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
        { field: "rating", headerName: "Rating", type: "number", minWidth: 180, flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor";
            },
        },

        { field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                <Fragment>
                    <Button
                        onClick={() => deleteReviewHandler(params.getValue(params.id, "id")) }
                    >
                        <DeleteIcon />
                    </Button>
                </Fragment>
                );
            },
        },
    ]

    const rows = []

    reviews && reviews.forEach((review) => {
        rows.push({
            id: review._id,
            rating: review.rating,
            comment: review.comment,
            user: review.name,
        });
    });

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminAllReviews(productId));
    };

    const deleteReviewHandler = (reviewId) => {
        dispatch(adminDeleteReview(productId, reviewId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(adminAllReviews(productId));
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    
        if (isDeleted) {
            alert.success("Review Deletd Succesfully");
            history.push("/admin/reviews");
            dispatch({ type: ADMIN_DELETE_REVIEW_RESET });
        }
    },[dispatch,error,alert,deleteError,history, isDeleted,productId])

    return (
        <Fragment>
            <MetaData title = "ALL REVIEWS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                {reviews && reviews.length > 0 ? (
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productReviewTable"
                    autoHeight
                    />
                ) : (
                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews
