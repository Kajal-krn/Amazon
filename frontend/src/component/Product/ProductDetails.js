import React,  { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import {clearErrors, getProductDetails, newReview} from "../../actions/productAction.js"
import {useDispatch, useSelector} from "react-redux"
import Loader from '../layout/Loader/Loader.js'
import ReviewCard from './ReviewCard.js'
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData.js'
import {addItemsToCart} from "../../actions/cartAction.js"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core"
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js'
import "./ProductDetails.css"

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading,error,product} = useSelector(state => state.productDetails);
    const {success, error : reviewError} = useSelector(state => state.newReview)

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if(quantity <= 1){
            alert.show(`You have to select atleast ${quantity} product`);
            return;
        }
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
    }

    const increaseQuantity = () => {
        if(quantity >= product.stock){
            alert.show(`You can only select ${quantity} ${product.name} for now`);
            return;
        }
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    }

    const options = {
        value : product.ratings,
        precision : 0.5,
        readOnly : true
    };

    const addToCartHandler = () => {
       // console.log(match.params.productId);
        dispatch(addItemsToCart(match.params.productId, quantity));
        alert.success("Item added to cart");
    }

    const submitReviewToggle = () => {
        if(open===true){
            setOpen(false);
        }else{
            setOpen(true)
        }
    }

    const reviewSubmitHandler = () => {
        const Form = new FormData();

        Form.set("rating", rating);
        Form.set("comment", comment);
        Form.set("productId", match.params.productId);

        dispatch(newReview(Form));

        setOpen(false);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted");
            dispatch({type : NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.productId))
    },[dispatch,match.params.productId,error,alert,reviewError,success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>

                    <MetaData title={`${product.name} -- AMAZON`}/>

                    <div className="productDetails">
                        <div>
                            <Carousel>
                                {product.images && 
                                product.images.map((item,index) => (
                                    <img 
                                        className="CarouselImage"
                                        key={item.url}
                                        src={item.url}
                                        alt={`${index} Slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options}/>
                                {product.numOfReviews ? (
                                    <span className="detailsBlock-2-span">{product.numOfReviews} Reviews</span>
                                ): (
                                    <span className="detailsBlock-2-span">No Reviews</span>
                                )}
                                
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input value={quantity} type="number" readOnly />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>

                                <p>
                                    Status : 
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? " Out Of Stock" : " In Stock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>

                        </div>
                    </div>

                    <h3 className="reviewHeading">Reviews</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating 
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                            <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && 
                            product.reviews.map(review => <ReviewCard review={review} key={review.user} />)}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
