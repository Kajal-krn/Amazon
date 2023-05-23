import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/all"
import "./Home.css"
import Product from '../Product/Product.js'

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Amazon</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                <Product />
            </div>

        </Fragment>
    )
}

export default Home
