import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/all"
import "./Home.css"
import Product from '../Product/Product.js'

const product = {
    name : "Black Tshirt",
    images : [{ url : "https://5.imimg.com/data5/GX/XW/MY-67450080/mens-black-plain-t-shirt-500x500.jpg" }],
    price : "$99",
    _id : "Aman"
}

const Home = () => {
    return (
        <Fragment>
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>

        </Fragment>
    )
}

export default Home
