const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create  product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next) => {   // passed the while async function inside catchAsyncError , so it carched the error and not let the server crash
    
    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }

    let imagesLink = [];

    if(images !== undefined){
        for (let i=0; i<images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder : "products",
            })
    
            imagesLink.push({
                public_id : result.public_id,
                url : result.secure_url
            })
        }
    }


    req.body.images = imagesLink;

    req.body.user = req.user.id;   // ading a new field (user) in req.boy for product create

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

    let apiFeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter();
        
    let products = await apiFeatures.query;

    let filteredProductsCount = await products.length;

    apiFeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    products = await apiFeatures.query;
  
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
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

    // checking if imgaes are changed
    if(req.body.ImageChange === "true"){

        let images = [];

        // single or multiple images
        if(typeof(req.body.images) === "string"){
            images.push(req.body.images);
        }else{
            images = req.body.images;
        }

        let imagesLink = [];

        if(images !== undefined){
            for(let i=0; i<product.images.length; i++){
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        }

        for (let j=0; j<images.length; j++){
            const result = await cloudinary.v2.uploader.upload(images[j], {
                folder : "products",
            })
         
            imagesLink.push({
                public_id : result.public_id,
                url : result.secure_url
            })
        }
        req.body.images = imagesLink;
    }else{
        req.body.images = product.images;
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
        message : "Product Updated Successfully",
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

    // deleting images 
    for(let i=0; i<product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
        userProfileUrl : req.user.avatar.url,
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

    let ratings = 0;
    if(numOfReviews !== 0){
        ratings = avg / numOfReviews;
    }

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

// get all products (Admin)
exports.getAdminProducts = catchAsyncErrors(async(req,res) => {

    const products = await Product.find();
  
    res.status(200).json({
        success: true,
        products
    })
})
