import React,{Fragment, useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {getProducts,clearErrors} from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "./ProductCard.js";
import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
import "./Product.css";

const Products = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount,resultPerPage} = useSelector(state => state.products)

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts(keyword,currentPage))
    },[dispatch,alert,error,keyword,currentPage])

    return (
        <Fragment>{loading ? (<Loader />) : (
            <Fragment>

                <h2 className="productHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>

                {resultPerPage < productsCount && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage} 
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}
            </Fragment>
        )}</Fragment>
    )
}

export default Products
