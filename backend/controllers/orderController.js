const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create new order
exports.newOrder = catchAsyncErrors(async(req,res,next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user : req.user._id,
        paymentInfo,
        paidAt : Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    res.status(201).json({
        success : true,
        order
    });

}) 