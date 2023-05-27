import React,  { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import {clearErrors, getProductDetails} from "../../actions/productAction.js"
import {useDispatch, useSelector} from "react-redux"
import ReactStars from 'react-rating-stars-component'
import Loader from '../layout/Loader/Loader.js'
import ReviewCard from './ReviewCard.js'
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData.js'
import "./ProductDetails.css"

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading,error,product} = useSelector(state => state.productDetails);

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
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 15 : 20,
        value : product.ratings,
        isHalf : true
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.productId))
    },[dispatch,match.params.productId,error,alert]);

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
                                <ReactStars {...options}/>
                                {product.numOfReviews ? (
                                    <span>{product.numOfReviews} Reviews</span>
                                ): (
                                    <span>No Reviews</span>
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
                                    <button>Add to Cart</button>
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

                            <button className="submitReview">Submit Review</button>

                        </div>
                    </div>

                    <h3 className="reviewHeading">Reviews</h3>
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
