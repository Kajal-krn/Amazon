const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

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

//get Single order
exports.getSingleOrder = catchAsyncErrors( async(req,res,next) => {

    const {id} = req.params;

    const order = await Order.findById(id).populate(
        "user",             // to get name and email of user instead of user id
        "name email"
    );

    if(!order){
        return next(new ErrorHandler(`Order not found with Id : ${id}`, 404));
    }

    res.status(200).json({
        success : true,
        order
    })

})

// get loggedIn user orders
exports.myOrders = catchAsyncErrors(async(req,res,next) => {
    
    const orders = await Order.find({user : req.user._id});

    res.status(200).json({
        success : true,
        orders
    })

})  