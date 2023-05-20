const Product = require("../models/productModel")

//create  product --Admin
exports.createProduct = async(req,res,next) => {
    //console.log(req.body);
    const product = await Product.create(req.body);

    res.status(200).json({
        success : true,
        product
    })
}

// get all products
exports.getAllProducts = async(req,res) => {
    
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

// get product details
exports.getProductDetails = async(req,res,next) => {

    // finding product with id
    const product = await Product.findById(req.params.id);

    //checking for null 
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    //sending status
    res.status(200).json({
        success : true,
        product
    })

}

//update product  --Admin
exports.updateProduct = async(req,res,next) => {
    
    // finding product with id
    let product = await Product.findById(req.params.id);
    
    //checking for null
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
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

}

// Delete product --Admin
exports.deleteProduct = async(req,res,next) => {

    // finding product with id
    const product = await Product.findById(req.params.id);

    //checking for null
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    //deleting product
    await product.remove()

    //sending status
    res.status(200).json({
        success : true,
        message : "Product deleted successfully"
    })

}
