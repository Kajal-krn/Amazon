import React,{Fragment, useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {getProducts,clearErrors} from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "./ProductCard.js";
import {useAlert} from "react-alert";
import "./Product.css";

const Products = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts())
    },[dispatch,alert,error])

    return (
        <Fragment>{loading ? (<Loader />) : (
            <Fragment>

                <h2 className="productHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>

            </Fragment>
        )}</Fragment>
    )
}

export default Products
