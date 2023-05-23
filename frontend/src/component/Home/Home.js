import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/all"
import "./Home.css"
import Product from '../Product/Product.js'
import MetaData from "../layout/MetaData.js"
import { getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js'
import {useAlert} from "react-alert";

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error,alert]) 

    return (

        <Fragment>
            {loading ? (
                <Loader />   // loading component
            ) : (
                <Fragment>

                    <MetaData title="AMAZON" />

                    <div className="banner">
                        <p>Welcome to Amazon</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">  {/*refering to container below */}
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">

                        {products && products.map((product) => (
                            <Product product={product} key={product._id}/>
                        ))}

                    
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
