const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create  product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next) => {   // passed the while async function inside catchAsyncError , so it carched the error and not let the server crash
    //console.log(req.body);
    const product = await Product.create(req.body);

    res.status(200).json({
        success : true,
        product
    })
})

// get all products
exports.getAllProducts = catchAsyncErrors(async(req,res) => {

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter();
    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        products
    })
})

// get product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next) => {

    // finding product with id
    const product = await Product.findById(req.params.id);

    //checking for null 
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    //sending status
    res.status(200).json({
        success : true,
        product
    })

})

//update product  --Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next) => {
    
    // finding product with id
    let product = await Product.findById(req.params.id);
    
    //checking for null
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    //updating product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    //sending status
    res.status(200).json({
        success : true,
        product
    });

})

// Delete product --Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {

    // finding product with id
    const product = await Product.findById(req.params.id);

    //checking for null
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    //deleting product
    await product.remove()

    //sending status
    res.status(200).json({
        success : true,
        message : "Product deleted successfully"
    })

})
