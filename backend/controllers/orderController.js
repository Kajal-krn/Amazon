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

// get all orders -admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    await orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })

}) 

async function UpdateStock(productId, quantity){

    const product = await Product.findById(productId);

    product.stock -= quantity;

    await product.save({validateBeforeSave : false})

}

// update order status -Admin
exports.updateOrder = catchAsyncErrors( async(req,res,next) => {

    const {id} = req.params;

    const order = await Order.findById(id);

    if(!order){
        return next(new ErrorHandler('Order not found with Id', 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if(req.body.status === "Shipped"){
        await order.orderItems.forEach(async(ord) => {
            await UpdateStock(ord.product,ord.quantity);
        })
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave : false});

    res.status(200).json({
        success : true
    });

})

// delete order -Admin
exports.deleteOrder = catchAsyncErrors( async(req,res,next) => {

    const {id} = req.params;

    const order = await Order.findById(id);

    if(!order){
        return next(new ErrorHandler('Order not found with Id', 404));
    }

 //   console.log(order);

    await order.remove();

   // console.log("deleted")

    res.status(200).json({
        success : true
    });

})