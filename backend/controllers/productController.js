const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create  product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next) => {   // passed the while async function inside catchAsyncError , so it carched the error and not let the server crash
    
    req.body.user = req.user.id;   // ading a new field (user) in req.boy for product create
    //console.log(req.body);
    const product = await Product.create(req.body);

    res.status(200).json({
        success : true,
        product
    })
})

// get all products
exports.getAllProducts = catchAsyncErrors(async(req,res) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
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

//create new review or Update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next) => {

    const {rating,comment,productId} = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewd = await product.reviews.find(         
        rev => rev.user.toString() === req.user._id.toString()    // present review's user ids matches with usser adding the review
    );                                                            // present review's user ids matches with usser adding the review
    
    if(isReviewd){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    await product.reviews.forEach( rev => {
        avg += rev.rating
    }) 

    avg = avg / (product.numOfReviews)

    product.ratings = avg;

    await product.save({
        validateBeforeSave : false
    })

    res.status(200).json({
        success : true,
        product
    })

})

// get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success : true,
        reviews : product.reviews
    })

})

// delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = await product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString() 
    );

    let avg = 0;
    await reviews.forEach( rev => {
        avg += rev.rating
    }) 

    const numOfReviews = await reviews.length;
    
    const ratings = avg / numOfReviews;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        success : true,
    })



})
