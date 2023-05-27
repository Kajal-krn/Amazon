import React, { Fragment } from 'react'
import CartItemCard from './CartItemCard.js'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {useAlert} from "react-alert"
import {addItemsToCart,removeItemFromCart} from "../../actions/cartAction"
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MetaData from '../layout/MetaData.js'
import "./Cart.css"

const Cart = ({history}) => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)
    const alert = useAlert()

    const increaseQuatity = (id, quantity, stock) => {
        if(quantity >= stock){
            alert.show(`You can only select ${quantity} for now`);
            return;
        }
        dispatch(addItemsToCart(id,quantity+1));
    }

    const decreaseQuatity = (id, quantity) => {
        if(quantity <= 1){
            alert.show(`You have to select atleast ${quantity} product`);
            return;
        }
        dispatch(addItemsToCart(id, quantity-1));
    }

    const deleteCartItem = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <Fragment>

            <MetaData title="CART" />

            {cartItems.length===0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>SubTotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuatity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuatity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`${cartItems.reduce(
                                    (acc,item) => acc + (item.quantity * item.price),0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={() => checkoutHandler()}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart
