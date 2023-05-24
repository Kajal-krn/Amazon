import React,{Fragment, useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {getProducts,clearErrors} from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "./ProductCard.js";
import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./Product.css";

const categories=[
    "Laptop","Footwear","Bottom","Tops","Attire","Camera","Cycle","Mobile","Desktop","Book","Bag"
]

const Products = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,50000]);
    const [category, setCategory] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products)

    const keyword = match.params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(price);
        dispatch(getProducts(keyword,currentPage,price,category))
    },[dispatch,alert,error,keyword,currentPage,price,category])

    return (
        <Fragment>{loading ? (<Loader />) : (
            <Fragment>

                <h2 className="productHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={50000}
                    />

                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >{category}</li>
                        ))}
                    </ul>

                </div>

                {resultPerPage < filteredProductsCount && (
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
